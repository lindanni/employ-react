import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom'
import Login from './containers/Login/Login.jsx'
import Main from './containers/Main/Main.jsx'
import Register from './containers/Register/Register.jsx'
import {Provider} from 'react-redux'
import store from './redux/store'
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
