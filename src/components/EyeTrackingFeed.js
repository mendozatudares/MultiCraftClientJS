import React, { useEffect } from "react";
import { startVideo, trackEyes, stopVideo } from "../utils/eye-tracking";

function handleEyeDirection(direction) {
  console.log(direction);
}

function EyeTrackingFeed() {
  useEffect(() => {
    const video = document.getElementById("eye-tracker-feed");
    var interval;

    const initializeWebcam = async () => {
      const model = await startVideo(video);
      interval = setInterval(() => trackEyes(model, video).then((direction) => handleEyeDirection(direction)), 500);
    }

    initializeWebcam();

    return () => {
      clearInterval(interval);
      stopVideo(video);
    }
  }, []);
  return (
    <div>
      <video id="eye-tracker-feed"></video>
    </div>
  );
}

export default EyeTrackingFeed;
