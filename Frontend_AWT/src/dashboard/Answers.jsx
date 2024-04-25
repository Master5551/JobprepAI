import React from "react";
import AnswerCard from "./Answercard";

const Answers = () => {
  return (
    <div className="answer-page">
      <h1
        style={{
          marginBottom: "20px",
          color: "black",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        Answers
      </h1>
      <AnswerCard
        question="What is an algorithm?"
        transcript="An algorithm is a step-by-step procedure or set of rules to solve a specific problem or accomplish a particular task."
      />
      <AnswerCard
        question="What are the characteristics of a good algorithm?"
        transcript="Some characteristics of a good algorithm include correctness, efficiency, clarity, and generality."
      />
      <AnswerCard
        question="What is time complexity?"
        transcript="Time complexity is a measure of the amount of time an algorithm takes to run as a function of the length of the input."
      />
      <AnswerCard
        question="What is space complexity?"
        transcript="Space complexity is a measure of the amount of memory space an algorithm requires as a function of the length of the input."
      />
      <AnswerCard
        question="What are the different types of algorithms?"
        transcript="There are various types of algorithms, including sorting algorithms, searching algorithms, graph algorithms, and more."
      />
      <AnswerCard
        question="What is a sorting algorithm?"
        transcript="A sorting algorithm is an algorithm that arranges elements of a list or array in a particular order, such as numerical or lexicographical."
      />
      <AnswerCard
        question="What is a searching algorithm?"
        transcript="A searching algorithm is an algorithm that finds the location of a target value within a list or array."
      />
      <AnswerCard
        question="What is a recursive algorithm?"
        transcript="A recursive algorithm is an algorithm that calls itself in order to solve a problem by dividing it into smaller subproblems."
      />
      <AnswerCard
        question="What is a greedy algorithm?"
        transcript="A greedy algorithm is an algorithm that makes the locally optimal choice at each step with the hope of finding a global optimum."
      />
      <AnswerCard
        question="What is a dynamic programming algorithm?"
        transcript="Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems and solving each subproblem only once."
      />
    </div>
  );
};

export default Answers;
