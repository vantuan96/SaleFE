// import logo from './logo.svg';
 import './App.css';
import { history } from './helpers/history';
import React, { Component } from 'react';
import {  Route, Switch ,Router} from 'react-router-dom';

const Dashboard = React.lazy(() => import('./containers/DashboardLayout'));

class App extends Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      // this.props.clearAlerts()
    })
  }
  render() {
    return (
    
      <Router  history={history}>
          <React.Suspense >
          <Switch>              
            <Route  path="/" name="Home" render={props => <Dashboard {...props} />} />
         
          </Switch>
        </React.Suspense>
      </Router>
    )
  }
}

export default App;
