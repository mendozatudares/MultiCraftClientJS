import React, { useEffect, useState } from "react";
import { startVideo, trackEyes, loadModel } from "../utils/eye-tracking";
import { processInstruction } from "../utils/parser";
import { sendCommand } from "../utils/websocket";

const PERIOD = 100;
const DWELL = 3000;

function EyeTrackingFeed(props) {
  const state = props.state;
  const track = props.track;
  const move = props.move;
  const onDwell = props.onDwell;
  const onEsc = props.onEsc;
  const [video, setVideo] = useState();
  const [model, setModel] = useState();
  const [direction, setDirection] = useState("Center");
  const [counter, setCounter] = useState(0);
  const [dwell, setDwell] = useState(false);

  useEffect(() => {
    const initializeWebcam = async () => {
      const video  = document.getElementById("eye-tracker-feed");
      await startVideo(video);
      setVideo(video);
    }

    if (!video) {
      initializeWebcam();
    }
  }, [video]);

  useEffect(() => {
    const getModel = async () => {
      const model = await loadModel();
      setModel(model);
    };

    if (video && !model) {
      getModel();
    }
  }, [model, video]);

  useEffect(() => {
    const handleEyeDirection = (d) => {
      if (d && track) {
        console.log(d);
        if (d === direction && direction === "Center") {
          if (counter + PERIOD > DWELL) {
            if (move) {
              sendCommand(state.websocket, state.uuid, processInstruction("move 1 forward"));
            } else {
              setDwell(true);
            }
          }
          setCounter(counter + PERIOD);
        } else {
          if (d !== "Center") {
            setDwell(false);
            setCounter(0);
            sendCommand(state.websocket, state.uuid, processInstruction(`turn ${d} 10`));
          }
        }
        setDirection(d);
      }
    };

    if (video && model) {
      var interval = setInterval(() => trackEyes(model, video).then((r) => handleEyeDirection(r)), PERIOD);
    }

    return () => { if (interval) clearInterval(interval) };
  }, [counter, direction, model, move, state, track, video]);

  useEffect(() => {
    if (dwell) {
      onDwell();
      setDwell(false);
      setCounter(0);
    }
  }, [dwell, onDwell]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setDwell(false);
        setCounter(0);
        onEsc();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onEsc]);

  return (
    <div>
      <video id="eye-tracker-feed"></video>
    </div>
  );
}

export default EyeTrackingFeed;
