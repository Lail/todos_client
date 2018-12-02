import React from 'react';
import styles from '../../styles';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({type}) => type === 'submit' ? styles.actionColor : 'transparent' };
  color: ${({type}) => type === 'submit' ? styles.neutralBright : styles.neutralDark };
  border: 1px solid;
  border-color: ${({type}) => type === 'submit' ? styles.actionColor : styles.neutralMid };
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 65%;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  &:hover {
    background-color: ${({type}) => type === 'submit' ? styles.actionDark : styles.neutralMid };
    border-color: ${({type}) => type === 'submit' ? styles.actionDark : styles.neutralMid };
    color: ${({type}) => type === 'submit' ? styles.neutralBright : styles.neutralDark };
  }
`;

const Button = ({ children, ...buttonProps }) => (
  <StyledButton {...buttonProps} >
    { children }
  </StyledButton>
)

export default Button
