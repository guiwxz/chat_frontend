import React from 'react';

import { Route, BrowserRouter } from 'react-router-dom';

import Login from './containers/Login';
import Chat from './containers/Chat';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Route exact component={Login} path='/' />
      <Route component={Chat} path='/chat' />
    </BrowserRouter>
  )
}

export default Routes;