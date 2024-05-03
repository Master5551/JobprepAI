import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import Switcher from "../components/switcher";
import Timer from "../components/timer";
import Wave from "../components/wave";
import "./speechpage.css";

export default function SpeechPage() {
  const navigate = useNavigate();
  const [textToCopy, setTextToCopy] = useState();
  const [isNavigating, setIsNavigating] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [questionResponses, setQuestionResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [submitTime, setSubmitTime] = useState(null);
  const [textColor, setTextColor] = useState("#fff"); // State for text color

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subjectName = searchParams.get("subject");
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");

    fetchQuestions();

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
    }
  }, []);

  useEffect(() => {
    if (transcript) {
      const words = transcript.split(" ").length;
      setTotalWords((prevWords) => prevWords + words);
      setHasAnswer(true);
    } else {
      setHasAnswer(false);
    }
  }, [transcript]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/questions/Algorithms"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
      setQuestionResponses(
        data.map((question) => ({ id: question.id, transcript: "" }))
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      handleStopButtonClick();
    } else {
      startListening();
    }
    setIsListening(!isListening);
  };

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const handleNextButtonClick = () => {
    if (!hasAnswer) {
      alert("Please give an answer before proceeding to the next question.");
      return;
    }

    const updatedQuestionResponses = [...questionResponses];
    updatedQuestionResponses[currentQuestionIndex].transcript = transcript;
    setQuestionResponses(updatedQuestionResponses);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    resetTranscript();

    if (currentQuestionIndex === 9) {
      const totalTime = questionResponses.reduce((total, response) => {
        return total + response.elapsedTime;
      }, 0);

      const totalWords = questionResponses.reduce((total, response) => {
        return total + response.transcript.split(" ").length;
      }, 0);

      const wordsPerMinute = totalWords / (totalTime / 60);

      setSubmitTime(new Date());
      PostQuestionResponses();
    }
  };

  const handleStopButtonClick = () => SpeechRecognition.stopListening();

  const PostQuestionResponses = async () => {
    try {
      // Code inside the try block
      if (!token) {
        console.error("Token not found");
        return;
      }

      const decodedToken = jwtDecode(token);
      const candidate_id = decodedToken.id;
      console.log(candidate_id);
      const dataToSend = {
        candidate_id: candidate_id,
        subject_name: subjectName,
        questionResponses: questionResponses,
      };
      console.log(dataToSend.questionResponses);

      const response = await fetch(
        "http://localhost:3001/api/questionResponses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post question responses");
      }

      // Navigate to "/" immediately after the first API call
      navigate("/");

      // Proceed to call the second API asynchronously
      const dataToSendSecondAPI = {
        candidate_id: candidate_id,
        subject_name: subjectName,
        entries: questionResponses.map((response) => ({
          id: response.id,
          transcript: response.transcript,
        })),
      };

      callSecondAPI(dataToSendSecondAPI)
        .then(() => {
          console.log("Second API call completed");
        })
        .catch((error) => {
          console.error("Error calling the second API:", error);
        });
    } catch (error) {
      // Handle errors here
      console.error("Error posting question responses:", error);
    }
  };

  const callSecondAPI = async (dataToSendSecondAPI) => {
    try {
      const decodedToken = jwtDecode(token);
      const candidate_id = decodedToken.id;

      const secondResponse = await fetch("http://localhost:8080/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSendSecondAPI),
      });

      if (!secondResponse.ok) {
        throw new Error("Failed to call the second API");
      }
    } catch (error) {
      console.error("Error calling the second API:", error);
      throw error; // Re-throw the error to propagate it back to the caller
    }
  };

  if (!browserSupportsSpeechRecognition || questions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="container">
        <Link className="logo" to="/index">
          <img src={logoDark} className="h-6 inline-block dark:hidden" alt="" />
          <img
            src={logoLight}
            className="h-6 hidden dark:inline-block"
            alt=""
          />
        </Link>
      </div>
      <div className="container p-8 relative">
        <div className="relative flex justify-end">
          <div className="absolute w-24 h-24">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFBF00" />
                  <stop offset="100%" stopColor="#FF00FF" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
              />
              <foreignObject x="17%" y="28%" width="73%" height="50%">
                <div className="flex items-center justify-center text-xl text-center">
                  <Timer
                    isRunning={startListening}
                    onUpdate={(time) => setTotalTime(time)}
                    setTotalWords={setTotalWords}
                  />
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl text-center leading-normal font-semibold">
          Job Role :{" "}
          <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">
            {subjectName}
          </span>
        </h3>
        <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-2xl md:leading-normal text-2xl leading-normal font-semibold">
            Question {currentQuestionIndex + 1}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            {questions[currentQuestionIndex]
              ? questions[currentQuestionIndex].question
              : "Loading..."}
          </p>
        </div>
        <div className="main-content mt-8 p-4 border border-gray-300 rounded relative">
          <textarea
            id="transcript" // Add id to textarea
            className="w-full h-32 p-4 bg-transparent border border-gray-400 rounded focus:outline-none resize-none"
            value={transcript}
            onChange={(e) => resetTranscript(e.target.value)}
            placeholder="Your transcript here..."
            style={{ color: textColor }} // Set inline style for text color
          ></textarea>
          {transcript && (
            <button
              className="absolute right-4 bottom-4 focus:outline-none bg-red-500 rounded-full p-2"
              style={{ color: textColor }}
              onClick={resetTranscript}
            >
              <FaTimes size={20} color={textColor} />
            </button>
          )}
        </div>
        <div className="flex justify-between mt-8">
          <div>
            <button onClick={toggleListening}>
              <span className="mic-icon">
                {isListening ? (
                  <FaMicrophoneSlash size={24} />
                ) : (
                  <FaMicrophone size={24} />
                )}
              </span>
            </button>
          </div>
          {isListening && <Wave />}
          <div>
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={PostQuestionResponses} disabled={!hasAnswer}>
                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                  Submit
                </span>
              </button>
            ) : (
              <button onClick={handleNextButtonClick} disabled={!hasAnswer}>
                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                  Next
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <Switcher setTextColor={setTextColor} />{" "}
    </>
  );
}
