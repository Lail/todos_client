import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import styles from '../../styles';
import styled from 'styled-components';
import posed from 'react-pose';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: inset 0 -3px 0 0 ${styles.neutralMid};
`;
const Item = styled.li`
  display: inline-block;
`;
const StyledLink = styled(NavLink)`
  display: inline-block;
  padding: 15px 20px 15px;
  margin: 0;
  text-decoration: none;
  font-size: 65%;
  color: ${styles.neutralDark};
  box-shadow: inset 0 -3px 0 0 ${styles.neutralMid};
  &:hover {
    background: ${styles.neutralBright};
    box-shadow: inset 0 -3px 0 0 ${styles.actionColor};
  }
  &.active {
    color: ${styles.actionColor};
    background: ${styles.neutralBright};
    box-shadow: 0 5px 0 solid #345609;
    box-shadow: inset 0 -3px 0 0 ${styles.actionColor};
  }
`;

const Nav = () => (
  <List>
    <Item>
      <StyledLink to="/tasks">
        Tasks
      </StyledLink>
    </Item>
    <Item>
      <StyledLink to="/tags">
        Tags
      </StyledLink>
    </Item>
  </List>
);

export default Nav;
