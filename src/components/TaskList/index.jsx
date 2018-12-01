import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../../styles';
import styled from 'styled-components';
import posed from 'react-pose';

// Components
import Task from '../Task';
import Spinner from '../Spinner';

const List = styled.div`
  position: absolute;
  top: 2em;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 300px;
  overflow: scroll;
`;

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
    <List>
      {tasks && tasks.map((task, i) => (
        <Task
          title={task.attributes.title}
          tags={task.relationships.tags.data}
          key={`task_${i}`}
        />
      ))}
      {!tasks &&
        <Spinner />
      }
    </List>
  )
};

export default TaskList;
