import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/signup.php', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Username:</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <FormControl
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        <Button variant="primary" type="submit" block>Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignUp;