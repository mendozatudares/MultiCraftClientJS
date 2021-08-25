import React from "react";
import { Box, FormLabel } from "@chakra-ui/react";

function ConnectionInfo(props) {
  const state = props.state;
  return (
    <div>
      <Box padding={3} borderWidth="1px" borderRadius="md">
        <FormLabel fontSize="md">
          Server: {`${state.ip}:${state.port}`}
        </FormLabel>
        <FormLabel fontSize="md">Username: {state.username}</FormLabel>
        <FormLabel fontSize="sm">UUID: {state.uuid}</FormLabel>
      </Box>
    </div>
  );
}

export default ConnectionInfo;
