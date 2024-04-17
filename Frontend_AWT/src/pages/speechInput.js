import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import Switcher from "../components/switcher";
import Timer from "../components/timer";

export default function SpeechPage() {
    const [textToCopy, setTextToCopy] = useState();
    const [questions, setQuestions] = useState([]);
    const [questionResponses, setQuestionResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subjectName = searchParams.get("subject");
    const token = localStorage.getItem("token");
    const [totalWords, setTotalWords] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");

        // Fetch questions from API when component mounts
        fetchQuestions();
        // Retrieve token from local storage and decode it to get user ID
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            // console.log("User ID:", userId);
            // Now you can use the userId as needed
        }
    }, []);

    useEffect(() => {
        if (transcript) {
            const words = transcript.split(" ").length;
            setTotalWords((prevWords) => prevWords + words);
        }
    }, [transcript]);


    const fetchQuestions = async () => {
        try {
            const response = await fetch(
                "http://localhost:3001/api/questions/1/15/Algorithms"
            );
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const data = await response.json();
            setQuestions(data);
            // Initialize questionResponses with empty array for each question
            setQuestionResponses(
                data.map((question) => ({ id: question.id, transcript: "" }))
            );
        } catch (error) {
            console.error("Error fetching questions:", error);

        }
    };

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    const handleNextButtonClick = () => {
        // Store the transcript with the question ID
        const updatedQuestionResponses = [...questionResponses];
        updatedQuestionResponses[currentQuestionIndex].transcript = transcript;
        setQuestionResponses(updatedQuestionResponses);

        // Increment current question index
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        resetTranscript(); // Reset transcript after successful request

        console.log(currentQuestionIndex);

        if (currentQuestionIndex === 8) { // Check if the current question index is 9 (10th question)
            const totalTime = questionResponses.reduce((total, response) => {
                return total + response.elapsedTime;
            }, 0); // Calculate total time by summing up individual question response times

            const totalWords = questionResponses.reduce((total, response) => {
                return total + response.transcript.split(" ").length;
            }, 0); // Calculate total number of words by summing up individual question response word counts

            const wordsPerMinute = totalWords / (totalTime / 60); // Calculate words per minute (WPM)

            console.log("Total Time:", totalTime);
            console.log("Total Words:", totalWords);
            console.log("Words Per Minute (WPM):", wordsPerMinute);
            // Now you can do whatever you want with these values, such as storing them in state variables
        }
    };



    const handleStopButtonClick = () => SpeechRecognition.stopListening();

    const postQuestionResponses = async () => {
        try {
            if (!token) {
                console.error("Token not found");
                return;
            }

            const decodedToken = jwtDecode(token);
            const candidate_id = decodedToken.id;

            const dataToSend = {
                candidate_id: candidate_id,
                subject_name: subjectName,
                questionResponses: questionResponses
            };

            console.log("cid");
            console.log(candidate_id);
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
            console.log("Question responses posted successfully");
        } catch (error) {
            console.error("Error posting question responses:", error);
        }
    };

    if (!browserSupportsSpeechRecognition || questions.length === 0) {
        return null;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <>
            <div className="container">
                <Link className="logo" to="/">
                    <img src={logoDark} className="h-6 inline-block dark:hidden" alt="" />
                    <img
                        src={logoLight}
                        className="h-6 hidden dark:inline-block"
                        alt=""
                    />
                </Link>
            </div>
            <div className="container p-8">
                <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl text-center leading-normal font-semibold">
                    Job Role :{" "}
                    <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">
                        {subjectName}
                    </span>
                </h3>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                        Question {currentQuestionIndex + 1}
                    </h3>
                    <Timer
                        isRunning={startListening}
                        onUpdate={(time) => {
                            console.log("Time:", time); // Log the time value to the console
                            setTotalTime(time); // Update the total time state if needed
                        }}
                        setTotalWords={setTotalWords}
                    />


                    <p className="text-slate-400 max-w-xl mx-auto">
                        {currentQuestion.question}
                    </p>
                </div>
                <div className="main-content mt-8 p-4 border border-gray-300 rounded">
                    {transcript}
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                    <div>
                        <button onClick={startListening}>
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                                Start Listening
                            </span>
                        </button>
                    </div>
                    <div className="mx-5"></div>
                    <div>
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button onClick={handleNextButtonClick} className="mx-5">
                                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                                    Submit
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={handleNextButtonClick}
                                disabled={isLastQuestion}
                                className="mx-5"
                            >
                                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                                    Next
                                </span>
                            </button>
                        )}
                    </div>
                    <div>
                        <button onClick={handleStopButtonClick}>
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                                Stop Listening
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Switcher/>
        </>
    );
}
