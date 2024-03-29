/**
 * Login Page
 * 
 * This will be the Sign Up/Regisrtation component
 * that will be used by new users that want to
 * create a new account on the website.
 * 
 * 
 * @author Nikitas Kaouslidis w20006928
 */

import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from '../Api.js';
import Alert from 'react-bootstrap/Alert';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    fetch(`${BASE_API_URL}/registration`,
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
          if (data.message === 'success') {
            setSuccessMessage('Registration successful! Please login.');
            setErrorMessage('');
            setTimeout(() => {
              navigate("/login");
            }, 5000);
          } else {
            setSuccessMessage('');
            setErrorMessage('Registration failed. Please try again.');
          }
        }

      )
      .catch(
        (e) => {
          console.log(e.message)
          setSuccessMessage('');
          setErrorMessage('Registration failed. Please try again.');
        }
      )
  };

  return (
    <div className="container mt-5">
      {successMessage && (
        <div><Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
          <Alert.Heading>{successMessage}</Alert.Heading>
          <p>You are being redirected to the login portal!</p>
          <hr /></Alert>
        </div>
      )}
      {errorMessage && (
        <div><Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          <Alert.Heading>{errorMessage}</Alert.Heading></Alert>
        </div>
      )}
      <h2 className="text-center">Sign Up</h2>
      <Form onSubmit={handleClick}>
        <FormGroup>
          <Form.Label>Username:</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            aria-describedby="usernameHelpBlock"
          />
          <Form.Text id="usernameHelpBlock" muted>
            Your username must be at least 3 characters long.
          </Form.Text>
        </FormGroup>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby="emailHelpBlock"
          />
          <Form.Text id="emailHelpBlock" muted>
            We'll never share your email with anyone else.
          </Form.Text>
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <FormControl
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be at least 8 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </FormGroup>
        <Button variant="primary" type="submit" block="true">Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignUp;