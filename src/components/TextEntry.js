import React, { useState } from "react";

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

export default TextEntry;
