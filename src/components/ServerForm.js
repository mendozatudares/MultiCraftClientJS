import React from "react";
import { initSocket } from "../utils/websocket";

function ServerForm(props) {
  const state = props.state;
  const setState = props.setState;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
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
            name="ip"
            placeholder="Enter server ip address"
            value={state.ip}
            onChange={handleChange}
          />
        </label>
        <label>
          Server Port
          <input
            type="text"
            name="port"
            placeholder="Enter server port"
            value={state.port}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ServerForm;
