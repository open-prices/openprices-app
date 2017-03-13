import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import Main from './components/MainLayout'
import Home from './components/Home'

import store from './store'
import * as jobs from './jobs'

import './App.css'

//var Router = BrowserRouter
var Router = HashRouter

var basename
//var basename = '/openprices-app'
class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
      <Provider store={store}>
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
      </LocaleProvider>
    );
  }
}

export default App;
