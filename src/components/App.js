import React from "react";
import "./App.css";
import UsernameForm from "./UsernameForm.js";
import ServerForm from "./ServerForm.js";
import TextEntry from "./TextEntry.js";
import VoiceEntry from "./VoiceEntry.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UsernameForm />
        <ServerForm />
        <TextEntry />
        <VoiceEntry />
      </header>
    </div>
  );
}

export default App;

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
