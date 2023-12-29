import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerCorrectly, correctAnswers } from './quizSlice';

const Question = ({ question, flattenedQuestions }) => {
  const dispatch = useDispatch();
  const { currentQuestion } = useSelector((state) => state.quiz);


  return (
    <>
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>
          </div>
          {flattenedQuestions.parentParagraph?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="question-text">{flattenedQuestions.questionText}</div>
          <div className="answer-options">
            {flattenedQuestions.answerOptions?.map((option, index) => (
              <div key={index} className="answer-option">
                <label>
                  <input
                    type="radio"
                    name={`question${currentQuestion}`}
                    value={index}
                    onChange={() => dispatch(answerCorrectly(option.isCorrect))}
                  />
                  {option.answerText}
                </label>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default Question;
