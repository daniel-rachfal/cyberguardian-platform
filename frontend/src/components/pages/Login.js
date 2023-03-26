/**
 * Login Page
 * 
 * This will be the Login Portal
 * that will be used by authorised 
 * users to sign in into their accounts.
 * 
 * 
 * @author Nikitas Kaouslidis w20006928
 */

import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate();


    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true)
            }
        }
        , [])

    const handleUsername = (event) => {
        setUsername(event.target.value);
        setUsernameValid(event.target.value !== "");
        setButtonDisabled(event.target.value === "" || password === "");
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordValid(event.target.value !== "");
        setButtonDisabled(event.target.value === "" || username === "");
    }
    
    const handleClick = () => {

        console.log('data being sent: ',{
            username: username,
            password: password,
        });

        const encodedString = Buffer.from(
            username + ":" + password
        ).toString('base64');

        fetch("http://localhost:8888/login",
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Basic " + encodedString })
            })
            .then(
                (response) => {
                    return response.json();
                }
            )
            .then(
                (json) => {
                    if (json.message === "success") {
                        props.handleAuthenticated(true);
                        localStorage.setItem('token', json.data.token);
                        localStorage.setItem('username', username);
                        alert("Successful login!")
                        navigate("/");
                    }
                    else {
                        alert("Unsuccessful login!")
                    }

                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )

    }

    const handleSignOut = () => {
        props.handleAuthenticated(false)
        setUsername("");
        setPassword("");
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    return (

        <div>
            {props.authenticated &&
                <div>
                    <div>Logged in as: {localStorage.getItem('username')}</div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="col-auto btn btn-primary btn-md ms-3" onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>}
            {!props.authenticated && <div className="d-flex flex-column" style={{ height: "82vh" }}>
                <h2>Login</h2>
                <form className="d-flex justify-content-center">
                    <div className="row">
                        <div className="mt-3 form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend3">@</span>
                                <input type="text" className={usernameValid ? "form-control is-valid" : "form-control is-invalid"} id="username" placeholder="Enter username" value={username} onChange={handleUsername} aria-describedby="inputGroupPrepend3" required />
                                {usernameValid ? (
                                    <div className="valid-feedback">
                                    </div>
                                ) : (
                                    <div className="invalid-feedback">
                                        Please fill out this field.
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="mt-3 form-group">
                            <label htmlFor="pass" className="form-label">Password</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend3">#</span>
                                <input type="password" className={passwordValid ? "form-control is-valid" : "form-control is-invalid"} id="pass" placeholder="Enter password" value={password} onChange={handlePassword} aria-describedby="inputGroupPrepend3" required />
                                {passwordValid ? (
                                    <div className="valid-feedback">
                                    </div>
                                ) : (
                                    <div className="invalid-feedback">
                                        Please fill out this field.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="mt-3 d-flex justify-content-center">
                    <button type="submit" className="col-3 btn btn-primary" onClick={handleClick} disabled={buttonDisabled}>Login</button>
                </div>
            </div>
            }
        </div>
    )

}
export default Login;