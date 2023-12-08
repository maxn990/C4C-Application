# C4C Application README

## High level overview 

This is a chat application where users can interact with all other users in the app. It uses FireBase Firestore database and React.js. It is hosted using Firebase hosting here: https://c4c-application.firebaseapp.com/. Authentication is through Firebase Authentication. 

Features include: 
- All basic features
- Authentication
 - Persistent authentication state
 - Users post under the email used to register 
- Timestamps on posts 
- Profanity filter 
- Send messages with the enter key rather than pressing enter 

## Components and interactions 

The code is run initially from the app.js file, which holds global variables determining if the user is authenticated and storing the email the user is posting under. App.js determiens which component to render depending on the state of authentication. If not authenticated, it displays a page where the user can login or signup through the AuthenticationComponent. If the user is authenticated, it displays ChatComponent, which renders the existing messages by calling DisplayMessages and renders the text bar. 

## Why I fulfill the requirements 

- Users can type to the message board 
  - The message cannot be empty or over 128 characters
- Users can see messages from most to least recent 
- Users on different computers (or different networks for that matter) can see and send messages to one another 
- Bonus features: 
  - Users and signup, login, and post under their emails 
  - Messages are filtered to replace profanity with * using the recommended API
- The application is hosted here: https://c4c-application.firebaseapp.com/
