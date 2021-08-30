import React, { useEffect, useState } from "react";
import { FormLabel, HStack, Textarea } from "@chakra-ui/react";
import ConnectionInfo from "./ConnectionInfo";
import EyeTrackingFeed from "./EyeTrackingFeed";
import { initRecognition } from "../utils/speech-to-text";
import { processInstruction } from "../utils/parser";
import { sendCommand } from "../utils/websocket";

function VoiceEntry(props) {
  const state = props.state;
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [track, setTrack] = useState(false);
  const [move, setMove] = useState(false);
  const [trackCommand, setTrackCommand] = useState({});

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
    const args = processInstruction(transcript);
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
    </>
  );
}

export default VoiceEntry;
