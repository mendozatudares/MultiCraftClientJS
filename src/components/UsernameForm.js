import React, { useState } from "react";

function UsernameForm() {
  const [state, setState] = useState({ username: "", uuid: "" });
  console.log(state);

  const handleChange = (event) => {
    setState({ ...state, username: event.target.value });
  };
  const handleSubmit = (event) => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/${state.username}`
    )
      .then((response) => response.json())
      .then((data) => setState({ ...state, uuid: data.id }))
      .catch((err) =>
        console.error(`Error fetching uuid for ${state.username}:\n\t${err}`)
      );
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
