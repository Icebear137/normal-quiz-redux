import React from 'react';

const Question = ({ question, handleAnswerOptionClick }) => {
  
  console.log(question)

  return (
    <>
      <div className="question-section">
                <div className="question-count">
                    <span>Question {question?.questionID}</span>
                </div>
                <div className="question-text">{question?.questionText}</div>
        </div>
      <div className="answer-section">
        {question?.answerOptions.map((answerOption, questionID) => (
          <button key={questionID} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
