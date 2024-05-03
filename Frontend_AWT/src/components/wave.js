import React, { useEffect, useRef, useState } from "react";
import "../pages/speechpage.css";

const Wave = ({ isListening }) => {
  const [waveHeight, setWaveHeight] = useState(0);
  const requestRef = useRef();

  const updateWaveHeight = () => {
    const randomHeight = Math.random() * 50; // Generate a random height for the wave (adjust as needed)
    setWaveHeight(randomHeight);
  };

  const animateWave = () => {
    updateWaveHeight();
    requestRef.current = requestAnimationFrame(animateWave);
  };

  useEffect(() => {
    if (isListening) {
      animateWave();
    } else {
      cancelAnimationFrame(requestRef.current);
      setWaveHeight(0); // Reset wave height when listening stops
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isListening]);

  return <div className={`wave ${isListening ? "active" : ""}`} style={{ height: `${waveHeight}px `}}/>;
};

export default Wave;