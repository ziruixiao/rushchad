import React from 'react';
import Router from 'react-router';
import routes from './config/routes';
import ReactDOM from 'react-dom';

Router.run(routes, (Root, state) => {
  ReactDOM.render(<Root {...state} />, document.getElementById('app'));
});