import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Main from './components/MainLayout'
import Home from './components/Home'

import './App.css'

//var Router = BrowserRouter
var Router = HashRouter

var basename
//var basename = '/openprices-app'
class App extends Component {
  render() {
    return (
      <Provider store={require('./store').default}>
        <Router basename={basename}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Main} />
            <Route render={() => (
              <div>oops</div>
            )} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
