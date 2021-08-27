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
  const [track, setTrack] = useState(false);
  const [move, setMove] = useState(false);
  const [trackCommand, setTrackCommand] = useState({});

  const handleChange = (event) => {
    setCommand(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const args = processInstruction(command);
    console.log(args);
    if (args.command) {
      if (args.track) {
        setTrack(true);
        setTrackCommand(args);
        if (args.command === "move") {
          setMove(true);
        }
      } else {
        sendCommand(state.websocket, state.uuid, args);
      }
    }
    setCommand("");
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
      <EyeTrackingFeed
        state={state} 
        track={track} 
        move={move}
        onDwell={() => {
          if (trackCommand.command === "build" || trackCommand.command === "place") {
            sendCommand(state.websocket, state.uuid, trackCommand);
            setTrack(false);
            setTrackCommand({});
          }
        }}
        onEsc={() => {
          setTrack(false);
          setMove(false);
        }}
      />
    </div>
  );
}

export default TextEntry;
