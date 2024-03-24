import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import Switcher from "../components/switcher";
import Timer from "../components/timer"; // Import the Timer component

export default function SpeechPage() {
    const [textToCopy, setTextToCopy] = useState();
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    useEffect(() => {
        let interval;
        if (
            SpeechRecognition.recognition &&
            SpeechRecognition.recognition.continuous
        )
            return () => {
                clearInterval(interval);
            };
    }, []);

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    const handleNextButtonClick = () => {
        resetTranscript();
    };

    const handleStopButtonClick = () => {
        SpeechRecognition.stopListening();
    };

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <>
            <div className="container">
                <Link className="logo" to="/">
                    <img
                        src={logoDark}
                        className="h-6 inline-block dark:hidden"
                        alt=""
                    />
                    <img
                        src={logoLight}
                        className="h-6 hidden dark:inline-block"
                        alt=""
                    />
                </Link>
            </div>

            <div className="container p-8">

                <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl text-center leading-normal font-semibold">Job Role :<span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">Database</span></h3>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Question-1</h3>
                    <Timer isRunning={startListening}></Timer>
                    <p className="text-slate-400 max-w-xl mx-auto">What is Primary Key?</p>
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
                        <button onClick={handleNextButtonClick} className="mx-5">
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
            </div >
            <Switcher />
        </>
    );
};
