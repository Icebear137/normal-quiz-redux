import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseScore, decreaseScore, answerCorrectly } from './quizSlice';

const Question = ({ question, setSelectedAnswer }) => {
  const dispatch = useDispatch();
  const { currentQuestion } = useSelector((state) => state.quiz);
  const [subQuestionCount, setSubQuestionCount] = useState(0);

  useEffect(() => {
    if (subQuestionCount === question.subQuestionCount) {
      dispatch(answerCorrectly(true));
    }
  }, [subQuestionCount, dispatch]);
  


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
                        onChange={(e)=>{const isCorrect = answerOption.isCorrect;
                          if (e.target.checked && isCorrect) {
                            setSubQuestionCount(subQuestionCount + 1);
                          }else{
                            if(subQuestionCount > 0 && subQuestionCount <= question.subQuestionCount){
                              setSubQuestionCount(subQuestionCount - 1);
                            }
                            dispatch(answerCorrectly(false));
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
