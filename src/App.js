import './App.css';
import { useState } from "react";
import { AuthenticationComponent } from "./Components/AuthenticationComponent";
import { ChatComponent } from "./Components/ChatComponent";

function App() {

  // Stores in state if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Stores the email of the authenticated user 
  const [userEmail, setUserEmail] = useState("");

  // Wrapper for setUserEmail so that it can be used when passed into AuthenticationComponent
  // and forces an update of this component so that the ChatComponent can be rendered
  // Takes a String email and saves it to state as userEmail
  const addEmail = (email) => {
    setUserEmail(email);
  }

  // Returns AuthenticationComponent if the user is not authenticated, otherwise returns ChatComponent
  // Passes the userEmail to ChatComponent and both setters to AuthenticationComponent
  return <>{isAuthenticated ? <ChatComponent userEmail={userEmail}/> : <AuthenticationComponent setUserEmail={addEmail} setIsAuthenticated={setIsAuthenticated}/>}</>
}

export default App;
