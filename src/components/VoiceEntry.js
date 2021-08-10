import React, { useEffect, useState } from "react";
import { initRecognition } from "../utils/speech-to-text";

function VoiceEntry(props) {
  const state = props.state;
  const setState = props.setState;
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

  const handleChange = (event) => {
    setState({ ...state, command: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Voice Command
          <input
            type="text"
            placeholder="Speak command"
            value={transcript}
            onChange={handleChange}
            disabled={true}
          />
        </label>
      </form>
    </div>
  );
}

export default VoiceEntry;
