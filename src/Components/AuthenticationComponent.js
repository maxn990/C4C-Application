import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    setPersistence,
    browserSessionPersistence } from 'firebase/auth';
import Cookies from 'js-cookie';

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
    const [loginIncorrect, setLoginIncorrect] = useState(false);

    useEffect(() => {
        const savedUserEmail = Cookies.get("userEmail");
        if (savedUserEmail) {
            props.setIsAuthenticated(true);
            props.setUserEmail(savedUserEmail);
        }
    }, []);

    const handleSignup = () => {
        setIsLogin(!is_login);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        if (is_login) {
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