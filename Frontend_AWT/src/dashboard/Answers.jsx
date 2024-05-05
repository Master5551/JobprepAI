import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnswerCard from "./AnswerCard";
import PdfDownloadButton from "./Report/pdfbuttondownload";
const Answers = () => {
  const location = useLocation();
  const { id: interviewId, subject: subjectName } = location.state || {};
  const [qaPairs, setQAPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scoresArray, setscorearray] = useState([]);
  let userId;
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    console.log("User ID:", userId);
  } else {
    console.error("JWT token not found in local storage.");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch answers
        const responseAnswers = await fetch(
          `http://localhost:3001/api/answers/${interviewId}`
        );
        if (!responseAnswers.ok) {
          throw new Error("Failed to fetch answers");
        }
        const responseData = await responseAnswers.json();
        const dataArray = JSON.parse(responseData[0].que_ans_list);

        const scoresArr = responseData[0].scores
          ? responseData[0].scores.split(",").map(Number)
          : [];
        setscorearray(scoresArr);

        // Fetch questions for each ID in que_ans_list
        const questionPromises = dataArray.map(async (item) => {
          const responseQuestion = await fetch(
            `http://localhost:3001/api/questionsforscore/${item.id}/${subjectName}`
          );
          if (!responseQuestion.ok) {
            throw new Error("Failed to fetch questions");
          }
          const questionData = await responseQuestion.json();
          return {
            question: questionData[0].question || "No question available",
            answer: item.transcript || "No answer available",
          };
        });

        // Wait for all question promises to resolve
        const qaPairsData = await Promise.all(questionPromises);
        console.log(qaPairsData);
        // Update state with questions and answers pairs
        setQAPairs(qaPairsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (interviewId && subjectName) {
      fetchData();
    }
  }, [interviewId, subjectName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {qaPairs.map((pair, index) => (
        <AnswerCard
          key={index}
          question={pair.question}
          transcript={pair.answer}
        />
      ))}
      <div
        style={{ color: "black", border: "1px solid black", padding: "20px" }}
      >
        {scoresArray.length > 0 ? (
          <PdfDownloadButton
            data={qaPairs}
            subjectName={subjectName}
            interviewId={interviewId}
            scores={scoresArray}
          />
        ) : (
          <h1>Processing...</h1>
        )}
      </div>
    </>
  );
};

export default Answers;
