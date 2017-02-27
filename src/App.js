import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Main from './components/MainLayout'
import Home from './components/Home'

import './App.css'

var Router = BrowserRouter
//var Router = HashRouter

class App extends Component {
  render() {
    return (
      <Provider store={require('./store').default}>
        <Router basename={''}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/app" component={Main} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
