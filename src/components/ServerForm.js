import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
    <>
      <form onSubmit={handleSubmit}>
        <FormControl id="server-ip" isRequired>
          <FormLabel>Server IP</FormLabel>
          <Input
            autoFocus
            type="text"
            name="ip"
            placeholder="Enter Server IP"
            value={state.ip}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <FormControl id="server-port" isRequired>
          <FormLabel>Server Port</FormLabel>
          <Input
            type="text"
            name="port"
            placeholder="Enter Server Port"
            value={state.port}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default ServerForm;
