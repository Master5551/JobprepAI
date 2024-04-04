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

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");

        // Fetch questions from API when component mounts
        fetchQuestions();
    }, []);

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

        if (currentQuestionIndex === 8) {
            postQuestionResponses();
        }
    };

    const handleStopButtonClick = () => SpeechRecognition.stopListening();

    const postQuestionResponses = async () => {
        try {
            const response = await fetch(
                "http://localhost:3001/api/questionResponses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(questionResponses),
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
                    <Timer isRunning={startListening}></Timer>
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
                        <button
                            onClick={handleNextButtonClick}
                            disabled={isLastQuestion}
                            className="mx-5"
                        >
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
                                Next
                            </span>
                        </button>
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
            <Switcher />
        </>
    );
}
