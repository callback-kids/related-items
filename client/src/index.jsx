import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserHistory as Router, Route, IndexRoute } from 'react-router-dom';
import App from './App';
import AppRouter from './Router';

ReactDOM.render(

  <AppRouter />,
  document.getElementById('root'),
);
