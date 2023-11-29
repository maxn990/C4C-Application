import React, { useState } from "react";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase authentication module

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_P8r7QiajPohCWWvV1WSNeXiw11TCvdI",
  authDomain: "c4c-application.firebaseapp.com",
  projectId: "c4c-application",
  storageBucket: "c4c-application.appspot.com",
  messagingSenderId: "487767412431",
  appId: "1:487767412431:web:0d1aaad5aafddaff2df1ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const AuthenticationComponent = (props) => {
    const [is_login, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        setIsLogin(!is_login);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        if (is_login) {
            signInWithEmailAndPassword(auth, email, password);
            props.setIsAuthenticated(true);
            props.setUserEmail(email);
        } else {
            createUserWithEmailAndPassword(auth, email, password);
            props.setIsAuthenticated(true);
            props.setUserEmail(email);
        }
    }

    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body className="text-center">
                    <Card.Title style={{ textAlign: 'center' }}>Chat App</Card.Title>
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
                        <p>{is_login ? "Don't have an account? Sign up" : "Already have an account? Log in"} <div onClick={handleSignup} style={{color: "blue"}}>{is_login ? 'here' : 'here'}</div></p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}