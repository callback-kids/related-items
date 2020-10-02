import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';

function AppRouter() {
  return (
    <Router>

      <Switch>
        <Route exact path="/products/:id" component={App} />
        <Route exact path="/" component={App} />
      </Switch>

    </Router>
  );
}

export default AppRouter;
