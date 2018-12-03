import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import posed from 'react-pose';
import styles from '../../styles';
import styled from 'styled-components';
import scrollIntoView from 'scroll-into-view';
import TaskListFormatter from '../../formatters/TaskListFormatter';

// Components
import Task from '../Task';
import Button from '../Button';
import Spinner from '../Spinner';
import TagSelect from '../TagSelect';

const PosedTaskList = posed.div({
  large: { top: '4.5em', flip: true },
  small: { top: '10em', flip: true },
});
const TaskList = styled(PosedTaskList)`
  position: absolute;
  right: 0; bottom: 0; left: 0;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    border-top: 1px solid ${styles.neutralMid};
    border-left: 1px solid ${styles.neutralMid};
    background-color: ${styles.neutralMid};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${styles.neutralBright};
    border-left: 1px solid ${styles.neutralMid};
    border-right: 0;
  }
`;
const PosedList = posed.div({
  enter: { opacity: 1.0 },
  exit: { opacity: 0.1 }
});
const PosedTaskForm = posed.form({
  large: { height: '8em', flip: true },
  small: { height: '2.5em', flip: true },
});
const TaskForm = styled(PosedTaskForm)`
  position: absolute;
  right: 0; top: 2em; left: 0;
  border-bottom: 1px solid ${styles.neutralMid};
  background-color: ${styles.neutralBright};
  padding: 0.5em 1em 0.5em 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;
const PosedTitleText = posed.textarea({
  large: { height: '4em', flip: true },
  small: { height: '2em', flip: true },
});
const TitleText = styled(PosedTitleText)`
  width: 100%;
  resize: none;
  font-size: 70%;
  border: 1px solid ${styles.neutralMid};
  padding: 0.35em 0.5em;
  border-radius: 3px;
  outline: 0 !important;
  &:focus {
    border: 2px solid ${styles.actionColor};
  }
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  button {
    margin-left: 0.5em;
  }
`;
const ListError = styled.div`
  background-color: ${styles.errorHighlight};
  color: ${styles.errorText};
  font-size: 60%;
  border-radius: 3px;
  margin: 1em;
  padding: 0.5em;
`;
const FormError = styled.div`
  color: ${styles.errorText};
  font-size: 60%;
`;

const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  const [listBusy, setListBusy] = useState(false);
  const [listError, setListError] = useState(null);
  const [formBusy, setFormBusy] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [textValue, setTextValue] = useState(null);
  const [selectValue, setSelectValue] = useState(null);

  // load full list on mount
  useEffect(() => {
    setListBusy(true);
    axios.get('http://localhost:3001/api/v1/tasks')
    .then((res) => {
      console.log( TaskListFormatter(res.data) );
      setTasks(TaskListFormatter(res.data));
    })
    .catch((error) => { console.log(error);setListError(`${error.message} 😧`) })
    .finally(() => { setListBusy(false) });
  }, []);

  const postNewTask = (title, tags=[]) => {
    setFormBusy(true);
    const payload = { data: {attributes: { title: title }}};
    axios.post('http://localhost:3001/api/v1/tasks', payload)
    .then((res) => {
      setTasks( [{id: res.data.data.id, title: res.data.data.attributes.title}, ...tasks] );
      deactivate();
      scrollIntoView(document.getElementById(`Task_${res.data.data.id}`));
    })
    .catch((error) => { setFormError(`${error.message} 😧`) })
    .finally(() => { setFormBusy(false) });
  }

  const submitNewForm = (e) => {
    e.preventDefault()
    debugger;
    const title = e.target.title.value;
    if(!title || title.length < 1){
      return setFormError("Can't be blank");
    }
    setFormError(null);
    postNewTask(title);
  }

  const activate = (e) => {
    e && e.preventDefault();
    setFormOpen(true);
  };
  const deactivate = (e) => {
    e && e.preventDefault();
    setFormError(null);
    setFormOpen(false);
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  }
  const handleSelectChange = (e) => {
    console.log('FIRE!!!');
    console.log(e.target.value);
    setSelectValue(e.target.value);
  }

  return (
    <Fragment>
      <TaskForm
        onSubmit={ submitNewForm }
        pose={ formOpen ? 'large' : 'small' }
      >
        <TitleText
          id='title'
          onClick={ activate }
          value={ formOpen ?  undefined : '' }
          readOnly={ !formOpen }
          pose={ formOpen ? 'large' : 'small' }
          placeholder="Add a Todo..."
          onChange={ handleTextChange }
        />
        { formOpen &&
          <Fragment>
            <TagSelect name='tags' inputValue={""} handleSelectChange={handleSelectChange} />
            <Actions>
              { formError &&
                <FormError>{ formError }</FormError>
              }
              { formBusy &&
                <Spinner/>
              }
              <Button onClick={deactivate} value="Cancel">Cancel</Button>
              <Button type="submit" value="Save" disabled={formBusy}>Save</Button>
            </Actions>
          </Fragment>
        }
      </TaskForm>
      <TaskList pose={ formOpen ? 'small' : 'large' }>
        { !listBusy && tasks &&
          <PosedList pose='enter' initialPose='exit' >
            {tasks.map((task, i) => (
              <Task
                title={task.title}
                tags={task.tags}
                id={task.id}
                data-key={`task_${i}`}
                key={`task_${i}`}
              />
            ))}
          </PosedList>
        }
        { listBusy &&
          <Spinner />
        }
        { listError &&
          <ListError>{ listError }</ListError>
        }
      </TaskList>
    </Fragment>
  )
};

export default Tasks;
