import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { AuthenticationComponent } from "./Components/AuthenticationComponent";
import { ChatComponent } from "./Components/ChatComponent";
function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [userEmail, setUserEmail] = useState("");

 const addEmail = (email) => {
   setUserEmail(email);
 }

  return <>{isAuthenticated ? <ChatComponent userEmail={userEmail}/> : <AuthenticationComponent setUserEmail={addEmail} setIsAuthenticated={setIsAuthenticated}/>}</>
}

export default App;
