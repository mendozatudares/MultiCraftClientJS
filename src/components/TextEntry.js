import React from "react";
import { processInstruction } from "../utils/parser.js";
import { sendCommand } from "../utils/websocket.js";

function TextEntry(props) {
  const state = props.state;
  const setState = props.setState;

  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };
  const handleSubmit = (event) => {
    sendCommand(
      state.websocket,
      state.uuid,
      processInstruction(state.command)
    );
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

export default TextEntry;
