import React from 'react';
import { useSelector } from 'react-redux';

const Question = ({ question, handleAnswerOptionClick }) => {
  const { currentQuestion } = useSelector((state) => state.quiz);

  return (
    <>
      <div className="question-section">
                <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>
                </div>
                <div className="question-text">{question?.questionText}</div>
        </div>
      <div className="answer-section">
        {question?.answerOptions.map((answerOption, questionID) => 
          answerOption && (
            <button key={questionID} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
              {answerOption.answerText}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Question;
