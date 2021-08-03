import React from "react";

function ServerForm(props) {
  const state = props.state;
  const setState = props.setState;

  const handleChange = (event) => {
    setState({ ...state, ip: event.target.value });
  };
  const handleSubmit = (event) => {
    setState({...state, view: "username"})
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
