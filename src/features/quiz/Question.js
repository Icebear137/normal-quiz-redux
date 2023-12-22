import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseScore, decreaseScore, answerCorrectly } from './quizSlice';

const Question = ({ question, setSelectedAnswer }) => {
  const dispatch = useDispatch();
  const { currentQuestion } = useSelector((state) => state.quiz);
  const [subQuestionAnswers, setSubQuestionAnswers] = useState([]);

  useEffect(() => {
    // Check if all sub-questions are answered
    const allSubQuestionsAnswered = subQuestionAnswers.every(answer => answer !== null);

    if (allSubQuestionsAnswered) {
      // Check if all sub-questions are answered correctly
      const allSubQuestionsCorrect = subQuestionAnswers.every(answer => answer === true);

      // Dispatch the answerCorrectly action
      dispatch(answerCorrectly(allSubQuestionsCorrect));
    }
  }, [subQuestionAnswers, dispatch]);
  


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
                        onChange={(e)=>{
                          const isCorrect = answerOption.isCorrect;
                          const newSubQuestionAnswers = [...subQuestionAnswers];
                          newSubQuestionAnswers[index] = e.target.checked && isCorrect;
                          setSubQuestionAnswers(newSubQuestionAnswers);
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
                      dispatch(answerCorrectly(true));
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
