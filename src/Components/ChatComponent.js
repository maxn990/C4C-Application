import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addDoc, collection, serverTimestamp, getFirestore } from "firebase/firestore";
import { DisplayMessages } from "./DisplayMessages";
import Alert from 'react-bootstrap/Alert';

export const ChatComponent = (props) => {

    const [message, setMessage] = useState('');
    const [messageTooLong, setMessageTooLong] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        if (message.length > 128) {
            setMessageTooLong(true);
            setMessage('');
            return;
        }
        const db = getFirestore();
        await addDoc(collection(db, "messages"), {
            message: props.userEmail + ": " + message,
            timestamp: serverTimestamp(),
            user: props.userEmail
        });
        setMessage('');
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage(e);
        }
    }

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