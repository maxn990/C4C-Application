import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { query, collection, orderBy, getFirestore, onSnapshot } from "firebase/firestore";

export const DisplayMessages = () => {

    // Stores the past messages in state 
    const [messages, setMessages] = useState([]);

    // Fetches the messages from FireStore and updates the state when the component mounts
    // Listens for changes to the database and updates the state when a change occurs
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(getFirestore(), "messages"), orderBy("timestamp")), (querySnapshot) => {
            const fetchedMessages = [];
            querySnapshot.forEach((doc) => {
                fetchedMessages.push(doc.data());
            });
            setMessages(fetchedMessages.reverse());
        });
        return () => unsubscribe();
    }, []);

    // Maps the messages to Cards to be displayed
    // Puts the most recent messages at the top of the display
    // Displays in the format: [user]: [message] [timestamp]
    // Timestamp is in the format: [month]/[day]/[year], [hour]:[minute]:[second] [AM/PM]
    // If the timestamp is not available, displays "..." until it becomes available
    return (
        <div>
            {messages.map((message, index) => {
                let timestamp = ""
                try{
                    timestamp = new Date(message.timestamp.toDate()).toLocaleString();
                }
                catch{
                   timestamp = "..." 
                }        
                return (
                    <Card style={{width: '55 rem', height: '5rem', marginBottom: '1%'}} key={index}>
                        <Card.Body>
                            <p>{message.message}</p>
                            <p style={{color: 'gray', fontSize: '10px'}}>{timestamp}</p>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}