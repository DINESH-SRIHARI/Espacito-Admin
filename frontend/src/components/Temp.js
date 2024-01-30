import React, { useRef, useState } from "react";
import title from '../statics/esm.mp4';

const Temp = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleStopVideo = () => {
    // Pause and reset the video playback
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    // Hide the video by updating state
    setIsVisible(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            margin: "10px",
          }}
        >
          <video ref={videoRef} autoPlay loop muted width="200">
            <source
              src={title} // Replace with the actual video source
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "10px",
              cursor: "pointer",
              color: "white",
            }}
            onClick={handleStopVideo}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Temp;
