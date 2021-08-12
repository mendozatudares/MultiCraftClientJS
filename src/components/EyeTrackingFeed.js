import React, { useEffect } from "react";
import { startVideo, stopVideo, trackEyes } from "../utils/eye-tracking";

function EyeTrackingFeed() {
  useEffect(() => {
    const video = document.getElementById("eye-tracker-feed");
    startVideo(video).then(() => trackEyes(video).then((r) => console.log(r)));
    return () => stopVideo(video);
  }, []);
  return (
    <>
      <video id="eye-tracker-feed"></video>
    </>
  );
}

export default EyeTrackingFeed;
