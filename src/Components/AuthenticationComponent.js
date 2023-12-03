import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    setPersistence,
    browserSessionPersistence } from 'firebase/auth';
import Cookies from 'js-cookie';
import { initializeApp } from "firebase/app";

// ENV vars for FireBase
const firebaseConfig = {
  apiKey: "AIzaSyA_P8r7QiajPohCWWvV1WSNeXiw11TCvdI",
  authDomain: "c4c-application.firebaseapp.com",
  projectId: "c4c-application",
  storageBucket: "c4c-application.appspot.com",
  messagingSenderId: "487767412431",
  appId: "1:487767412431:web:0d1aaad5aafddaff2df1ba"
};

// Initializes FireBase 
const app = initializeApp(firebaseConfig);

export const AuthenticationComponent = (props) => {
    // Stores in state if the user is logging in or signing up to determine which form to present
    const [is_login, setIsLogin] = useState(true);
    // Stores the value in the email input field
    const [email, setEmail] = useState('');
    // Stores the value of the password input field 
    const [password, setPassword] = useState('');
    // Stores in state if the login was incorrect to display an error message if necessary
    const [loginIncorrect, setLoginIncorrect] = useState(false);

    // Checks if there is an email saves in cookies and if so, sets the user as authenticated
    // auth state from FireBase is persistent, so this storing non-FireBase data 
    useEffect(() => {
        const savedUserEmail = Cookies.get("userEmail");
        if (savedUserEmail) {
            props.setIsAuthenticated(true);
            props.setUserEmail(savedUserEmail);
        }
    }, []);

    // Toggles between login and signup forms when the button is pressed 
    const handleSignup = () => {
        setIsLogin(!is_login);
    }

    // Handles form submission by sigining up a user or logging in a user 
    // Updates the auth state in FireBase and the global state in App.js
    // Updates the userEmail cookie so the user does not have to sign in
    // again for 1 week 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        if (is_login) {
            // Login case - sign in with email and password and set persistence 
            setPersistence(auth, browserSessionPersistence).then(() => {
                signInWithEmailAndPassword(auth, email, password).then(() => {
                    props.setIsAuthenticated(true);
                    props.setUserEmail(email);
                    Cookies.set("userEmail", email, {expires: 7})
                }).catch((error) => {
                    setLoginIncorrect(true);
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
            });
        } else {
            // Signup case - create user with email and password and set persistence
            setPersistence(auth, browserSessionPersistence).then(() => {
                createUserWithEmailAndPassword(auth, email, password).then(() => {
                    props.setIsAuthenticated(true);
                    props.setUserEmail(email);
                    Cookies.set("userEmail", email, {expires: 7})
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    // Return a form with an email and password input field and a button to submit the form
    // Allows the user to toggle between login and signup forms, and displays an error message
    // should the user enter incorrect login information 
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body className="text-center">
                    <Card.Title style={{ textAlign: 'center' }}>C4C Chat App</Card.Title>
                    <Card.Text>
                        Please {is_login ? 'log in' : 'sign up'} to continue.
                    </Card.Text>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" onClick={handleFormSubmit} className="btn btn-primary">{is_login ? 'Log In' : 'Sign Up'}</button>
                    </form>
                    <div style={{ marginTop: '1rem' }}>
                        <p>{is_login ? "Don't have an account? Sign up" : "Already have an account? Log in"} <span onClick={handleSignup} style={{color: "blue"}}>{is_login ? 'here' : 'here'}</span></p>
                    </div>
                    {loginIncorrect ? <p style={{color: 'red'}}>Incorrect email or password</p> : <></>}
                </Card.Body>
            </Card>
        </div>
    )
}