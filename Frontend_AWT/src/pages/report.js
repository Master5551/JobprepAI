import React, { useState } from 'react';

const Questionnaire = () => {
    const [questions, setQuestions] = useState([
        { id: 1, question: "Question 1", answer: "Answer 1" },
        { id: 2, question: "Question 2", answer: "Answer 2" },
        { id: 3, question: "Question 3", answer: "Answer 3" },
        { id: 4, question: "Question 4", answer: "Answer 4" },
        { id: 5, question: "Question 5", answer: "Answer 5" },
        { id: 6, question: "Question 6", answer: "Answer 6" },
        { id: 7, question: "Question 7", answer: "Answer 7" },
        { id: 8, question: "Question 8", answer: "Answer 8" },
        { id: 9, question: "Question 9", answer: "Answer 9" },
        { id: 10, question: "Question 10", answer: "Answer 10" },
    ]);

    const calculateAccuracyScore = () => {
        // Example: calculate accuracy score based on user's answers
        const correctAnswers = 7; // Assuming 7 out of 10 are correct
        const totalQuestions = questions.length;
        return Math.round((correctAnswers / totalQuestions) * 100);
    };

    const accuracyScore = calculateAccuracyScore();

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Questionnaire</h1>
            <div>
                {questions.map(question => (
                    <div key={question.id} className="mb-4">
                        <p className="font-semibold">{question.question}</p>
                        <p>{question.answer}</p>
                    </div>
                ))}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Accuracy Score: {accuracyScore}%</h2>
                    <div className="bg-gray-200 h-8 rounded-lg overflow-hidden">
                        <div className={`bg-gradient-to-r from-red-400 to-green-400 h-full w-${accuracyScore}`} />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{accuracyScore >= 70 ? "Well done!" : "Keep practicing!"}</p>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
