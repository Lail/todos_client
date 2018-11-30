import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './styles';
import styled from 'styled-components';

const Ground = styled.div`
  background-color: ${styles.neutralDark};
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-size: calc(10px + 2vmin);
  color: ${styles.neutralDark};
`;
const Card = styled.div`
  background-color: ${styles.neutralBright};
  width: 100%;
  max-width: 400px;
  padding: 2vmin;
`;

class App extends Component {
  render() {
    return (
      <Ground>
        <Card>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Card>
      </Ground>
    );
  }
}

export default App;
