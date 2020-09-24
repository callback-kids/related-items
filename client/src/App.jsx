import React from 'react';
import { Container, Column, Row } from 'react-bootstrap';
// import axios from 'axios';

const App = () => (
  <Container>
    <Row>
      <Column xs={0} s={2} />
      <Column xs={12} s={8}>
        <div>
          <h1 id="test">New React App</h1>
        </div>
      </Column>
      <Column xs={0} s={2} />
    </Row>
  </Container>
);

export default App;
