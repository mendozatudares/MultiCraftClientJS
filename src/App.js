import React, { useState } from "react";
import "./App.css";

function UsernameForm() {
  const [state, setState] = useState({ username: "", uuid: "" });
  console.log(state);

  const handleChange = (event) => {
    setState({ ...state, username: event.target.value });
  };
  const handleSubmit = (event) => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/${state.username}`
    )
      .then((response) => response.json())
      .then((data) => setState({ ...state, uuid: data.id }))
      .catch((err) => console.error(`Error fetching uuid for ${state.username}:\n\t${err}`));
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Minecraft Username
          <input
            type="text"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function ServerForm() {
  const [state, setState] = useState({ ip: "" });
  console.log(state);
  const handleChange = (event) => {
    setState({ ...state, ip: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Server IP
          <input
            type="text"
            placeholder="Enter server ip address"
            value={state.ip}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function TextEntry() {
  const [state, setState] = useState({ command: "" });
  console.log(state);
  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text Command
          <input
            type="text"
            placeholder="Enter command"
            value={state.command}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

function VoiceEntry() {
  const [state, setState] = useState({ command: "" });
  console.log(state);
  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Voice Command
          <input
            type="text"
            placeholder="Speak command"
            value={state.command}
            onChange={handleChange}
            disabled="true"
          />
        </label>
      </form>
    </div>
  );
}

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