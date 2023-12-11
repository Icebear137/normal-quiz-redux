// Quiz.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, increaseScore, setShowScore } from './quizSlice';
import Question from './Question';

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
    }
  };

  return (
    <div className='quiz'>
	  {showScore ? (
		<div className='score-section'>
		  You scored {score} out of {questionsWithShuffledOptions.length}
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
