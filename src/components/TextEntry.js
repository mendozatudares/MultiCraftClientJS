import React, { useState } from "react";
import { processInstruction } from "../utils/parser";
import { sendCommand } from "../utils/websocket";

function TextEntry(props) {
  const state = props.state;
  const [command, setCommand] = useState("");

  const handleChange = (event) => {
    setCommand(event.target.value);
  };

  const handleSubmit = (event) => {
    sendCommand(state.websocket, state.uuid, processInstruction(command));
    event.preventDefault();
  };

  return (
    <div>
      <label>Server: {`${state.ip}:${state.port}`}</label>
      <label>Username: {state.username}</label>
      <form onSubmit={handleSubmit}>
        <label>
          Text Command
          <input
            autoFocus
            type="text"
            placeholder="Enter command"
            value={command}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default TextEntry;
