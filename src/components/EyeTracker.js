import React, { useEffect } from "react";
import { startVideo, stopVideo, trackEyes } from "../utils/eye-tracking";

function EyeTracker() {
  useEffect(() => {
    const video = document.getElementById("eye-tracker-feed");
    startVideo(video)
      .then(() => trackEyes(video).then((r) => console.log(r)))
      .then(() => stopVideo(video));
  }, []);
  return (
    <div>
      <video id="eye-tracker-feed"></video>
    </div>
  );
}

export default EyeTracker;
