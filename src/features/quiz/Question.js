import React from 'react';
import { useDispatch } from 'react-redux';

const Question = ({ question, handleAnswerOptionClick }) => {

  return (
    <>
      <div className="question-section">
                <div className="question-count">
                    <span>Question {question.questionID}</span>
                </div>
                <div className="question-text">{question.questionText}</div>
        </div>
      <div className="answer-section">
        {question.answerOptions.map((answerOption, questionID) => (
          <button key={questionID} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
