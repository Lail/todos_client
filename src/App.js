import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from './styles';
import styled from 'styled-components';

// Components
import Nav from './components/Nav';
import Tasks from './components/Tasks';
import Tags from './components/Tags';
import Spinner from './components/Spinner';

const Ground = styled.div`
  background-color: ${styles.neutralDark};
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-size: calc(10px + 2vmin);
  padding: 10px;
`;
const Card = styled.div`
  background-color: ${styles.neutralBright};
  width: 100%;
  max-width: 400px;
  color: ${styles.neutralDark};
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Ground>
          <Card>
            <Nav />
            <Switch>
              <Route path={`/(|tasks)`} component={Tasks}/>
              <Route path={`/tags`} component={Tags}/>
              <Route render={() => <div>404</div>} />
            </Switch>
            <Spinner />
          </Card>
        </Ground>
      </Router>
    );
  }
}

export default App;
