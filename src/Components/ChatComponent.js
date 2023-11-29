import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export const ChatComponent = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: '60rem', height: '40rem' }}>
                <Card.Body className="text-center">
                    <p>Max Norman: Sample message</p>
                    <p>Naomi Calhoun: Another sample message</p>
                </Card.Body>
                <InputGroup className="mb-3" style={{ padding: '10px' }}>
                    <Form.Control
                        placeholder="Message"
                        aria-label="Message"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-success" id="button-addon2">
                        Send
                    </Button>
                </InputGroup>
            </Card>
        </div>
    )
}