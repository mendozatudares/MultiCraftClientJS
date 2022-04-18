import React, {useEffect, useState} from "react";
import {processInstruction} from "../utils/parser";
import {webgazer} from "../utils/webgazer";
import {sendCommand} from "../utils/websocket";

const DWELL = 3000;
const SENSITIVITY = 12;

function EyeTrackingFeed(props) {
    const state = props.state;
    const track = props.track;
    const move = props.move;
    const onDwell = props.onDwell;
    const onEsc = props.onEsc;
    const [dwell, setDwell] = useState(false);
    const [init, setInit] = useState(false);
    var start = 0;
    var displacement = "Center";

    useEffect(async () => {
        const getDisplacement = (data) => {
            const width = window.innerWidth/2;
            const height = window.innerHeight/2;
            var displaceX = !data ? 0 : data.x - width;
            var displaceY = !data ? 0 : data.y - height;
            var tierX = Math.floor(displaceX / (width / 5));
            var tierY = Math.floor(displaceY / (height / 5));
            return [tierX, tierY]
        };

        const handleGaze = (data, clock) => {
            var [x, y] = getDisplacement(data);

            if (track && Math.abs(x) < SENSITIVITY && Math.abs(y) < SENSITIVITY && clock - start > DWELL) {
                if (move) sendCommand(state.websocket, state.uuid, processInstruction("move 1 forward"));
                else      setDwell(true);
            } else if (Math.abs(x) >= SENSITIVITY || Math.abs(y) >= SENSITIVITY) {
                setDwell(false);
                start = clock;
                if (track) {
                    sendCommand(state.websocket, state.uuid, processInstruction(`turn ${(x < 0) ? "left" : "right"} ${Math.abs(x)}`));
                    sendCommand(state.websocket, state.uuid, processInstruction(`tilt ${(y < 0) ? "up" : "down"} ${Math.abs(y)}`));
                }
            }
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
