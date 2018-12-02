import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import posed from 'react-pose';
import styled from 'styled-components';

// Components
import Task from '../Task';
import Spinner from '../Spinner';

const Wrapper = styled.div`
  position: absolute;
  top: 2em;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
`;
const PosedList = posed.nav({
  on: { staggerChildren: 100 }
});
const List = styled(PosedList)``;

const TaskList = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/tasks')
    .then((res) => {
      setTasks(res['data']['data']);
    })
    .catch((error) => {console.log(error)});
  }, []);

  return (
    <Wrapper>
      { tasks &&
        <PosedList
          pose='on'
          initialPose='off'
        >
        {tasks.map((task, i) => (
          <Task
            title={task.attributes.title}
            tags={task.relationships.tags.data}
            key={`task_${i}`}
          />
        ))}
        </PosedList>
      }
      {!tasks &&
        <Spinner />
      }
    </Wrapper>
  )
};

export default TaskList;
