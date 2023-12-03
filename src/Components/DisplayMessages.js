import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { query, collection, orderBy, getFirestore, onSnapshot } from "firebase/firestore";

export const DisplayMessages = () => {

    const [messages, setMessages] = useState([]);

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