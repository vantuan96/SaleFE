// import logo from './logo.svg';
 import './App.css';
import { history } from './helpers/history';
import React, { Component } from 'react';
import {  Route, Switch ,Router} from 'react-router-dom';
import i18n from './i18n'
import { withTranslation } from 'react-i18next';


const Dashboard = React.lazy(() => import('./containers/DashboardLayout'));

class App extends Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      // this.props.clearAlerts()
    })
  }
  render() {
    // const { t, i18n } = this.props;

    // const changeLanguage = (lng) => {
    //   i18n.changeLanguage(lng);
    // }

    return (
    <>
    {/* <div className="App-header">
    <h1>{t('title')}</h1>
          <button onClick={() => changeLanguage('vn')}>vn</button>
          <button onClick={() => changeLanguage('en')}>en</button>
        </div> */}
        <Router  history={history}>
          <React.Suspense >
          <Switch>              
            <Route  path="/" name="Home" render={props => <Dashboard {...props} />} />
         
          </Switch>
        </React.Suspense>
      </Router>
    </>
    
    )
  }
}

export default withTranslation()(App);
