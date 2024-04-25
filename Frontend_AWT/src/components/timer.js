// Timer.js
import React, { useEffect, useState } from "react";

const Timer = ({ isRunning }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Function to format the timer value into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${ minutes }:${ seconds < 10 ? "0" : "" }${ seconds }`;
  };

  return <p>Timer: {formatTime(time)}</p>;
};

export default Timer;