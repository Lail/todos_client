import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';
import styled from 'styled-components';
import posed from 'react-pose';

const List = styled.div`
  padding: 5px;
  min-height: 300px;
  box-shadow: inset 0 -3px 0 0 ${styles.neutralMid};
`;
const Item = styled.li`
  display: inline-block;
`;

const TaskList = () => (
  <List>
    <Item>
      a Task
    </Item>
  </List>
);

export default TaskList;
