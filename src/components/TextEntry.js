import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import ConnectionInfo from "./ConnectionInfo";
import EyeTrackingFeed from "./EyeTrackingFeed";
import { processInstruction } from "../utils/parser";
import { sendCommand } from "../utils/websocket";

function TextEntry(props) {
  const state = props.state;
  const [command, setCommand] = useState("");

  const handleChange = (event) => {
    setCommand(event.target.value);
  };

  const handleSubmit = (event) => {
    sendCommand(state.websocket, state.uuid, processInstruction(command));
    setCommand("");
    event.preventDefault();
  };

  return (
    <div>
      <ConnectionInfo state={state} />
      <form onSubmit={handleSubmit}>
        <FormControl mt="5" id="text-command" isRequired>
          <FormLabel>Text Command</FormLabel>
          <InputGroup>
            <Input
              autoFocus
              type="text"
              placeholder="Enter Command"
              value={command}
              onChange={handleChange}
            ></Input>
            <InputRightElement>
              <Button colorScheme="teal" type="submit">
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
      <EyeTrackingFeed />
    </div>
  );
}

export default TextEntry;
