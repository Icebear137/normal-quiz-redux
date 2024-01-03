import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerCorrectly, correctAnswers } from './quizSlice';

const Question = ({ question, flattenedQuestions, setSelectedAnswer }) => {
  const dispatch = useDispatch();
  const { currentQuestion } = useSelector((state) => state.quiz);

  return (
    <>
        <div className="question-section">
          <div className="question-count text-[40px] font-semibold">
            <span>Question {currentQuestion + 1}</span>
          </div>
          {flattenedQuestions.parentParagraph?.map((paragraph, index) => (
            <p className='text-[30px] font-medium' key={index}>{paragraph}</p>
          ))}
          <div className="question-text text-[20px] font-medium">{flattenedQuestions.questionText}</div>
          <div className="answer-options pt-[30px] flex flex-col gap-[8px]">
            {flattenedQuestions.answerOptions?.map((option, index) => (
              <div key={index} className="answer-option">
                <label>
                  <input
                    type="radio"
                    name={`question${currentQuestion}`}
                    className='mr-[10px]'
                    value={index}
                    onChange={() => {
                      dispatch(answerCorrectly(option.isCorrect))
                      setSelectedAnswer(option.isCorrect)
                    }}
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
