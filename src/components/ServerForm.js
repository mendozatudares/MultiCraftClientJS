import React, { useState } from "react";

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

export default ServerForm;
