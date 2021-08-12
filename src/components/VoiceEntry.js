import React, { useEffect, useState } from "react";
import { FormLabel, HStack, Textarea } from "@chakra-ui/react";
import ConnectionInfo from "./ConnectionInfo";
import { initRecognition } from "../utils/speech-to-text";
import { processInstruction } from "../utils/parser";
import { sendCommand } from "../utils/websocket";

function VoiceEntry(props) {
  const state = props.state;
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    initRecognition((speechReconitionObject) =>
      setRecognition(speechReconitionObject)
    );
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        setTranscript(result.trim());
      };
    }
  }, [recognition]);

  useEffect(() => {
    sendCommand(state.websocket, state.uuid, processInstruction(transcript));
  }, [state, transcript]);

  return (
    <>
      <ConnectionInfo state={state} />
      <HStack>
        <FormLabel>Voice Command</FormLabel>
        <Textarea
          type="text"
          placeholder="Speak Command"
          value={transcript}
          disabled={true}
        ></Textarea>
      </HStack>
    </>
  );
}

export default VoiceEntry;
