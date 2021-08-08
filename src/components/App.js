import React, { useState } from "react";
import "./App.css";
import ServerForm from "./ServerForm.js";
import UsernameForm from "./UsernameForm.js";
import TextEntry from "./TextEntry.js";
import VoiceEntry from "./VoiceEntry.js";

function App() {
  const [state, setState] = useState({ view: "server", ip: "localhost", port: 5005, username: "", uuid: "", command: "", websocket: "" });
  
  return (
    <div className="App">
      <header className="App-header">
        {state.view === "server" && <ServerForm state={state} setState={setState} />}
        {state.view === "username" && <UsernameForm state={state} setState={setState} />}
        {state.view === "text" && <TextEntry state={state} setState={setState} />}
        {state.view === "voice" && <VoiceEntry state={state} setState={setState} />}
      </header>
    </div>
  );
}

export default App;

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
