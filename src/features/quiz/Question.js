import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleAnswerOptionClick, handleAnswerOptionClickForParagraph } from './quizSlice';

const Question = ({ question, setSelectedAnswer }) => {
  const dispatch = useDispatch();
  const { currentQuestion } = useSelector((state) => state.quiz);
  const [selectedParaOption, setSelectedParaOption] = useState(false);

  if (selectedParaOption) {
    setSelectedAnswer(true);
    setSelectedParaOption(false);
  }

  return (
    <>
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>
        </div>
        {question?.questionType === 1 ? (
          <>
            <div className="question-text">{question?.questionParagraph}</div>
            {question?.questionOptions.map((subQuestion, index) => (
              <div key={index} className="sub-question-section">
                <div className="sub-question-text">{subQuestion.questionText}</div>
                <div className="answer-section">
                  {subQuestion.answerOptions.map((answerOption, answerIndex) => (
                    <label key={answerIndex} className="radio-option">
                      <input
                        type="radio"
                        id={`radio-${index}-${answerIndex}`}
                        name={`radio-${index}`}
                        onChange={(event) => {
                          const isCorrect = subQuestion.answerOptions[answerIndex].isCorrect;
                          if (event.target.checked && isCorrect) {
                            setSelectedAnswer(true);
                          }
                        }}
                      />
                      {answerOption.answerText}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="question-text">{question?.questionText}</div>
            {question?.answerOptions.map((answerOption, index) => (
              <label key={index} className="radio-option">
                <input
                  type="radio"
                  id={`radio-${index}`}
                  name="radio"
                  onChange={(event) => {
                    const isCorrect = answerOption.isCorrect;
                    if (event.target.checked && isCorrect) {
                      setSelectedAnswer(true);
                    }
                  }}
                />
                {answerOption.answerText}
              </label>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Question;
