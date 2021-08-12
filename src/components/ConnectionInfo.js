import React from "react";
import { FormLabel } from "@chakra-ui/react";

function ConnectionInfo(props) {
  const state = props.state;
  return (
    <>
      <FormLabel>Server: {`${state.ip}:${state.port}`}</FormLabel>
      <FormLabel>Username: {state.username}</FormLabel>
      <FormLabel>UUID: {state.uuid}</FormLabel>
    </>
  );
}

export default ConnectionInfo;
