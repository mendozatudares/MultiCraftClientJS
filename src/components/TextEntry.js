import React, { useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
} from "@chakra-ui/react";
import ConnectionInfo from "./ConnectionInfo";
import EyeTracker from "./EyeTracker";
import { processInstruction } from "../utils/parser";
import { sendCommand } from "../utils/websocket";

function TextEntry(props) {
  const state = props.state;
  const [command, setCommand] = useState("");
  const [eyeTracking, setEyeTracking] = useState(false);

  const handleChange = (event) => {
    setCommand(event.target.value);
  };

  const handleSwitchChange = () => {
    setEyeTracking(!eyeTracking);
    if (eyeTracking) {
    }
  };

  const handleSubmit = (event) => {
    sendCommand(state.websocket, state.uuid, processInstruction(command));
    setCommand("");
    event.preventDefault();
  };

  return (
    <>
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
      <Center>
        <FormControl mt="5" display="flex" alignItems="center">
          <FormLabel htmlFor="eye-tracking" mb="0">
            Eye Tracking
          </FormLabel>
          <Switch
            isChecked={eyeTracking}
            onChange={handleSwitchChange}
            id="eye-tracking"
          />
        </FormControl>
      </Center>
      {eyeTracking && <EyeTracker />}
    </>
  );
}

export default TextEntry;
