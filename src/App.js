import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { AuthenticationComponent } from "./Components/AuthenticationComponent";
import { ChatComponent } from "./Components/ChatComponent";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return <>{isAuthenticated ? <ChatComponent userEmail={userEmail}/> : <AuthenticationComponent setUserEmail={setUserEmail} setIsAuthenticated={setIsAuthenticated}/>}</>
}

export default App;
