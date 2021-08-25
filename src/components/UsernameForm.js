import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { getUser } from "../utils/websocket";

function UsernameForm(props) {
  const state = props.state;
  const setState = props.setState;
  const [entryMethod, setEntryMethod] = useState("text");

  const handleChange = (event) => {
    setState({ ...state, username: event.target.value });
  };

  const handleRadioChange = (event) => {
    setEntryMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    getUser(state.websocket, state.username, (data) => {
      setState({
        ...state,
        username: data.name,
        uuid: data.id,
        view: entryMethod,
      });
    });
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl id="minecraft-username" isRequired>
          <FormLabel>Minecraft Username</FormLabel>
          <Input
            autoFocus
            type="text"
            placeholder="Enter Username"
            value={state.username}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <HStack>
          <FormControl id="input-method" as="fieldset" isRequired>
            <FormLabel as="legend">Choose an Input Method</FormLabel>
            <RadioGroup defaultValue="text">
              <HStack spacing="24px">
                <Radio value="text" onChange={handleRadioChange}>
                  Text
                </Radio>
                <Radio value="voice" onChange={handleRadioChange}>
                  Voice
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </HStack>
      </form>
    </div>
  );
}

export default UsernameForm;
