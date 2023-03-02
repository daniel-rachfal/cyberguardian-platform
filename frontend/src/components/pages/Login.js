/**
 * Login Page
 * 
 * This will be the Login Portal
 * that will be used by authorised 
 * users to sign in and update the Award status
 * of a paper.
 * 
 * 
 * @author Nikitas Kaouslidis w20006928
 */

import React, { useState, useEffect } from 'react';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

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

    const handleSignOut = () => {
        props.handleAuthenticated(false)
        setUsername("");
        setPassword("");
        localStorage.removeItem('token');
    }

    return (

        <div>
                <h2>Admin Portal</h2>
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
                    <button type="submit" className="col-3 btn btn-primary" disabled={buttonDisabled}>Sign in</button>
                </div>
            </div>
    )

}
export default Login;