import React from 'react'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button';

const Home = () => (
  <Jumbotron>
    <h2>Welcome to exquisite corpse</h2>
    <p>
      <Button bsStyle="primary" href="/login">Login with Slack</Button>
    </p>
  </Jumbotron>
)

export default Home;
