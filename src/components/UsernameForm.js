import React from "react";
import { getUser } from "../utils/websocket";

function UsernameForm(props) {
  const state = props.state;
  const setState = props.setState;

  const handleChange = (event) => {
    setState({ ...state, username: event.target.value });
  };
  const handleSubmit = (event) => {
    getUser(state.websocket, state.username, (data) => {
      setState({
        ...state,
        username: data.name,
        uuid: data.id,
        view: "text",
      });
    });
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

export default UsernameForm;
