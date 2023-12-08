import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addDoc, collection, serverTimestamp, getFirestore } from "firebase/firestore";
import { DisplayMessages } from "./DisplayMessages";
import Alert from 'react-bootstrap/Alert';

export const ChatComponent = (props) => {

    // Stores the content of the current message being entered by the user 
    const [message, setMessage] = useState('');
    // Stores in state if the message is too long to display an error message if necessary
    const [messageTooLong, setMessageTooLong] = useState(false);

    // Sends the message to the database and clears the message input field
    const sendMessage = async (e) => {
        e.preventDefault();
        // Determines if the message is empty; does nothing if so 
        if (message.trim() === '') {
            return;
        }
        // Determines if the message is too long; displays an error message if so
        if (message.length > 128) {
            setMessageTooLong(true);
            setMessage('');
            return;
        }
        // Sends the message to FireStore and checks for profanity in the message
        const db = getFirestore();
        await addDoc(collection(db, "messages"), {
            message: props.userEmail + ": " + await checkProfanity(message),
            timestamp: serverTimestamp(),
            user: props.userEmail
        });
        setMessage('');
    }

    // Checks the user input for profanity and returns the censored message
    // or the same message if no profanity is found
    const checkProfanity = async (text) => {
        // Defines variables for the API call 
        const apiUrl = 'https://api.api-ninjas.com/v1/profanityfilter';
        const apiKey = 'H/wGWj9DObohpDZ6m1FpmQ==HNwGku2zO4Fwyx5C';
        try {
            // Calls the API 
            const response = await fetch(`${apiUrl}?text=${text}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Gets the results from the API call and censors the message
            const result = await response.json();
            // The API returns a lower case version of the message, so this replaces 
            // the lower case letters with upper case letters from the original message
            // if the new character equals the lower case version of the old character 
            // in order to preserve the original casing of the message as entered by the user
            const censored = result.censored.split('');
            for (let i = 0; i < censored.length; i++) {
                censored[i] = censored[i].toUpperCase() === text[i] ? text[i] : censored[i];
            }
            // Returns the censored message
            return censored.join('');
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    // Sends the message if the user presses enter; provides an alternative
    // to manually clicking the send button 
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage(e);
        }
    }

    // Displays the messages and the message input field
    return (
        <>
            <div className="container">
                {messageTooLong ? <Alert variant="danger" onClose={() => setMessageTooLong(false)} dismissible>Message must be 128 characters or fewer.</Alert> : null}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card style={{ width: '60rem', height: '40rem' }}>
                    <Card.Body className="text-center" style={{ overflowY: 'auto' }}>
                        <DisplayMessages/>
                    </Card.Body>
                    <InputGroup className="mb-3" style={{ padding: '10px' }}>
                        <Form.Control
                            placeholder="Message"
                            aria-label="Message"
                            aria-describedby="basic-addon2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <Button variant="outline-success"
                        id="button-addon2"
                        onClick={sendMessage}>
                            Send
                        </Button>
                    </InputGroup>
                </Card>
            </div>
        </>
    )
}