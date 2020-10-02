import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';

function AppRouter() {
  return (
    <Router>

      <Switch>
        <Route path="/products/:id" component={App} />
        <Route path="/" component={App} />
      </Switch>

    </Router>
  );
}

export default AppRouter;
