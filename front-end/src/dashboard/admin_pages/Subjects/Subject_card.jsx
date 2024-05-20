import React from "react";
import { useNavigate } from "react-router-dom";
import "./Subject_card.css";

const Gotosubject = ({ subjectName }) => {
  const navigate = useNavigate();

  const Gotosubject = async () => {
    try {
      navigate(`/admin/subject/${subjectName}`, {
        state: { subject: subjectName },
      });
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <button className="go-to-answers-button" onClick={Gotosubject}>
      Edit
    </button>
  );
};

const SubjectCard = ({
  title,

  description,
  subjectName,
}) => {
  return (
    <div className="score-card">
      <h2 className="score-card-title">{title}</h2>
      <p className="description">{description}</p>
      <Gotosubject subjectName={subjectName} />
    </div>
  );
};

export default SubjectCard;
