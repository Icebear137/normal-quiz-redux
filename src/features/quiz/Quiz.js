import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextQuestion,
  prevQuestion,
  answerCorrectly,
  previousAnswer,
  increaseScore,
  decreaseScore,
  setShowScore,
  resetQuestion,
  resetScore,
} from './quizSlice';
import Question from './Question';
import Answers from './Answers';

const Quiz = () => {
  const dispatch = useDispatch();
  const {
    currentQuestion,
    score,
    correct,
    questionsCount,
    showScore,
    questionsWithShuffledOptions,
    flattenedQuestions,
  } = useSelector((state) => state.quiz);
  
  const handleNext = () => {
    if (correct) {
      dispatch(increaseScore());
    }
    dispatch(nextQuestion());
    //reset state event
    dispatch(answerCorrectly(false));
    if (currentQuestion === questionsCount - 1) {
      dispatch(setShowScore(true));
      dispatch(resetQuestion());
    }
  };

  // const handlePrev = () => {
  //   dispatch(prevQuestion());
  //   if (prevAnswer) {
  //     dispatch(decreaseScore());
  //     dispatch(previousAnswer(false));
  //   }
  // };

  const handleReset = () => {
    dispatch(resetScore());
    dispatch(setShowScore(false));
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questionsWithShuffledOptions.length}
          {/* <Answers /> */}
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      ) : (
        <>
          <Question
            question={questionsWithShuffledOptions[currentQuestion]}
            flattenedQuestions={flattenedQuestions[currentQuestion]}
          />
          <div>
            {/* <button onClick={() => handlePrev()}>Prev</button> */}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
