import React, { useState } from "react";
import { getUser } from "../utils/websocket";

function UsernameForm(props) {
  const state = props.state;
  const setState = props.setState;
  const [entryMethod, setEntryMethod] = useState(null);

  const handleChange = (event) => {
    setState({ ...state, username: event.target.value });
  };
  const handleSubmit = (event) => {
    console.log(event.target);
    getUser(state.websocket, state.username, (data) => {
      setState({
        ...state,
        username: data.name,
        uuid: data.id,
        view: entryMethod,
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
            autoFocus
            type="text"
            placeholder="Enter username"
            value={state.username}
            onChange={handleChange}
          />
        </label>
        <input
          onClick={() => setEntryMethod("text")}
          type="submit"
          value="Use Text"
        />
        <input
          onClick={() => setEntryMethod("voice")}
          type="submit"
          value="Use Voice"
        />
      </form>
    </div>
  );
}

export default UsernameForm;
