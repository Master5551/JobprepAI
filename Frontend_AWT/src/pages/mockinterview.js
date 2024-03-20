import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);
  const [microphones, setMicrophones] = useState([]);
  const commands = [
    // Your speech recognition commands...
  ];

  useEffect(() => {
    // Fetch and list available microphones when component mounts
    if (navigator.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const audioInputs = devices.filter(
          (device) => device.kind === "audioinput"
        );
        setMicrophones(audioInputs);
        setSelectedMicrophone(audioInputs[0]?.deviceId);
      });
    }
  }, []);

  const handleChangeMicrophone = (event) => {
    setSelectedMicrophone(event.target.value);
  };

  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div>
      <select value={selectedMicrophone} onChange={handleChangeMicrophone}>
        <option value={null}>Select Microphone</option>
        {microphones.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId.substring(0, 5)}`}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleStartListening}>Start</button>
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
