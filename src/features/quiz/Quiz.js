import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextQuestion,
  prevQuestion,
  answerCorrectly,
  setShowScore,
  resetQuestion,
  resetScore,
} from './quizSlice';
import Question from './Question';

const Quiz = () => {
  const dispatch = useDispatch();
  const {
    currentQuestion,
    correct,
    questionsCount,
    showScore,
    questionsWithShuffledOptions,
    flattenedQuestions,
  } = useSelector((state) => state.quiz);

  const allQuestionsAnswer = useRef(Array(questionsCount).fill(false));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    if (showScore) {
      const count = allQuestionsAnswer.current.filter((answer) => answer).length;
      setCorrectAnswersCount(count);
      console.log(count); // Display the correct answers count in the console.
    } else {
      setCorrectAnswersCount(0); // Reset the count when not in showScore state
    }
  }, [allQuestionsAnswer, showScore]);

  const handleNext = () => {
    if (correct) {
      allQuestionsAnswer.current[currentQuestion] = true;
    }

    dispatch(nextQuestion());
    dispatch(answerCorrectly(false));

    if (currentQuestion === questionsCount - 1) {
      dispatch(setShowScore(true));
      dispatch(resetQuestion());
    }
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  }

  const handleReset = () => {
    dispatch(resetScore());
    dispatch(setShowScore(false));
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {correctAnswersCount} out of {questionsWithShuffledOptions.length}
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      ) : (
        <>
          <Question
            question={questionsWithShuffledOptions[currentQuestion]}
            flattenedQuestions={flattenedQuestions[currentQuestion]}
          />
          <div>
            {currentQuestion === 0 ? null : (
              <button onClick={() => handlePrev()}>Prev</button>
            )}
            <button onClick={() => handleNext()}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
