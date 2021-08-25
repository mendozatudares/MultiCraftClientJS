import React, { useEffect } from "react";
import { startVideo, trackEyes, stopVideo } from "../utils/eye-tracking";

function EyeTrackingFeed() {
  useEffect(() => {
    const video = document.getElementById("eye-tracker-feed");
    startVideo(video).then((model) => setInterval(() => trackEyes(model, video).then((r) => console.log(r)), 500));
    // return () => stopVideo(video);
  }, []);
  return (
    <div>
      <video id="eye-tracker-feed"></video>
    </div>
  );
}

export default EyeTrackingFeed;
