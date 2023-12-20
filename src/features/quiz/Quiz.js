import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, increaseScore, setShowScore, resetQuestion, resetPersistedState } from './quizSlice';
import Question from './Question';
import Answers from './Answers';
import { persistor } from '../../app/store';
import { resetPersistedStateAction } from './quizAction';
import axios from 'axios';

const Quiz = () => {
  const dispatch = useDispatch();
  const { currentQuestion, score, showScore, questionsWithShuffledOptions } = useSelector((state) => state.quiz);


  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      dispatch(increaseScore());
    }

    dispatch(nextQuestion());

    if (currentQuestion + 1 === questionsWithShuffledOptions.length) {
      dispatch(setShowScore(true));
      dispatch(resetQuestion());
    }
  };

  const handleReset = () => {
    // dispatch(resetPersistedStateAction());
    dispatch(setShowScore(false));
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questionsWithShuffledOptions.length}
          <Answers />
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      ) : (
        <>
          <Question
            question={questionsWithShuffledOptions[currentQuestion]}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
