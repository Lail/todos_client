import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';
import styled from 'styled-components';
import posed from 'react-pose';

// Components
import Task from '../Task';

const List = styled.div`
  min-height: 300px;
`;

const TaskList = () => (
  <List>
    <Task/>
    <Task/>
    <Task/>
  </List>
);

export default TaskList;
