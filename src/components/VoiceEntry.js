import React from "react";

function VoiceEntry(props) {
  const state = props.state;
  const setState = props.setState;

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

export default VoiceEntry;
