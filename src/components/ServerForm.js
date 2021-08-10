import React from "react";
import { initSocket } from "../utils/websocket";

function ServerForm(props) {
  const state = props.state;
  const setState = props.setState;

  const handleChange = (event) => {
    setState({ ...state, ip: event.target.value });
  };
  const handleSubmit = (event) => {
    initSocket(state.ip, state.port, (socket) => {
      setState({
        ...state,
        view: "username",
        websocket: socket,
      });
    });
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Server IP
          <input
            autoFocus
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

export default ServerForm;
