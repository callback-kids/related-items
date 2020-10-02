import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

function AppRouter() {
  return (
    <Router>

      <Route path="/" component={App} />

      <Route
        path="/products/:id"
        render={(props) => <App {...props} />}
      />

    </Router>
  );
}

export default AppRouter;
