import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 2em;
  display: flex;
  align-items: stetch;
  box-shadow: inset 0 -3px 0 0 ${styles.neutralMid};
`;
const Item = styled.li`
  display: flex;
  align-items: stetch;
`;
const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0 2em;
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
    color: ${styles.actionDark};
    background: ${styles.highlight};
    box-shadow: inset 0 -3px 0 0 ${styles.actionColor};
  }
`;

const Nav = () => (
  <List>
    <Item>
      <StyledLink
        to="/tasks"
        isActive={(match, {pathname}) => (match || pathname === '/')}
      >
        Tasks
      </StyledLink>
    </Item>
    <Item>
      <StyledLink to="/tags">
        Tags
      </StyledLink>
    </Item>
  </List>
)

export default Nav;
