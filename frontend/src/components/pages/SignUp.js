import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    console.log('Data being sent:', {
      username: username,
      email: email,
      password: password
  });

    fetch("http://localhost:8888/registration",
        {
            method: 'POST',
            body: formData
        })
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
          (data) => {
            console.log(data);
            if (data.message === 'success') {
              alert('Registration successful! Please log in.');
              navigate("/login");
            } else {
              alert('Registration failed. Please try again.');
            }
          }

        )
        .catch(
            (e) => {
                console.log(e.message)
            }
        )
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      <Form onSubmit={handleClick}>
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
        <Button variant="primary" type="submit" block = "true">Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignUp;