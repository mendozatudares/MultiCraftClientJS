import React, {useEffect, useState} from "react";
import {processInstruction} from "../utils/parser";
import {webgazer} from "../utils/webgazer";
import {sendCommand} from "../utils/websocket";

const DWELL = 3000;
const SENSITIVITY = 25;
const TURNSPEED = 5;

function EyeTrackingFeed(props) {
    const state = props.state;
    const track = props.track;
    const move = props.move;
    const onDwell = props.onDwell;
    const onEsc = props.onEsc;
    const [dwell, setDwell] = useState(false);
    const [init, setInit] = useState(false);
    var start = 0;
    var position = {x: -1, y: -1};
    var displacement = "Center";

    useEffect(async () => {
        const getDisplacement = (data) => {
            var displaceX = data.x - position.x;
            var displaceY = data.y - position.y;
            position = {x: data.x, y: data.y};

            if (displaceX > SENSITIVITY)
                return "Right";
            else if (displaceX < -SENSITIVITY)
                return "Left";
            else if (displaceY > SENSITIVITY)
                return "Down";
            else if (displaceX < -SENSITIVITY)
                return "Up";
            else
                return "Center";
        };

        const handleGaze = (data, clock) => {
            const dir = getDisplacement(data);
            console.log(clock, dir);

            if (dir && track) {
                if (dir === displacement && displacement === "Center" && clock - start > DWELL) {
                    if (move) {
                        sendCommand(state.websocket, state.uuid, processInstruction("move 1 forward"));
                    } else {
                        setDwell(true);
                    }
                }
            } else if (dir !== "Center") {
                setDwell(false);
                start = clock;
                if (track) {
                    sendCommand(state.websocket,
                        state.uuid,
                        processInstruction(`${(dir === "Up" || dir === "Down") ? "tilt" : "turn"} ${dir} ${TURNSPEED}`));
                }
            }
            displacement = dir;
        };

        if (!init) {
            await webgazer.setRegression('ridge')
                .setGazeListener(handleGaze)
                .saveDataAcrossSessions(true)
                .begin();
            webgazer.showVideoPreview(true)
                .showPredictionPoints(true)
                .applyKalmanFilter(true);

            setInit(true);
        }
    }, [init, start, displacement, move, state, track]);

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
        <>
            <video id="eye-tracker-feed"></video>
        </>
    );
}

export default EyeTrackingFeed;
