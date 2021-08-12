import React, { useEffect, useState } from "react";
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
    <div>
      <ConnectionInfo state={state} />
      <label>
        Voice Command
        <textarea
          type="text"
          rows={5}
          placeholder="Speak command"
          value={transcript}
          disabled={true}
        />
      </label>
    </div>
  );
}

export default VoiceEntry;
