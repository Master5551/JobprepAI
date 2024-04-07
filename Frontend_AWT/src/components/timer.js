import React, { useEffect, useState } from 'react';

const Timer = ({ isRunning }) => {
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
      }, 1000); // Update every second
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  // Function to format the timer value into hours, minutes, and seconds
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Timer: {formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Timer;
