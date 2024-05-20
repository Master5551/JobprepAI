import React, { useEffect, useState } from "react";

const Timer = ({ isRunning, onUpdate }) => {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      if (!startTime) {
        setStartTime(Date.now());
      }

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000); // Convert to seconds
        setElapsedTime(elapsed);
        onUpdate(elapsed); // Call onUpdate with elapsed time
      }, 1000); // Update every second
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime, onUpdate]);

  // Function to format the timer value into minutes and seconds
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  };

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "60%",
        display: "flex",
      }}
    >
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Timer;
