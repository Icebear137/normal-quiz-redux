import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextQuestion,
  prevQuestion,
  answerCorrectly,
  setScore,
  setShowScore,
  resetQuestion,
  resetScore,
} from './quizSlice';
import Question from './Question';
import { TbReload } from "react-icons/tb";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Result from './Result';
import ListQuestions from './ListQuestions';

const Quiz = () => {
  const dispatch = useDispatch();
  const {
    currentQuestion,
    correct,
    score,
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
      dispatch(setScore(correctAnswersCount));
      dispatch(setShowScore(true));
      dispatch(resetQuestion());
    }
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  }

  const handleReset = () => {
    allQuestionsAnswer.current = Array(questionsCount).fill(false);
    dispatch(resetScore());
    dispatch(setShowScore(false));
  };

  return (
    <div className="quiz flex m-auto w-full ">
      {showScore ? (
        <Result
          correctAnswersCount={correctAnswersCount}
          questionsWithShuffledOptions={questionsWithShuffledOptions}
          handleReset={handleReset}  
        />
      ) : (
        <div className='flex gap-3 p-[20px] w-full h-fit place-content-between '>
          <div className=' border-[1px]  rounded-[10px] shadow-sm p-[20px] w-full '>
          <Question
            question={questionsWithShuffledOptions[currentQuestion]}
            flattenedQuestions={flattenedQuestions[currentQuestion]}
          />
          <div className='flex place-content-between bottom-0 p-[20px] mt-[30px]'>
            {currentQuestion === 0 ? null : (
              <div className='border-[1px] rounded-[10px] py-[10px] px-[15px] bg-gray-200 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-gray-50 transition hover:duration-300 hover:ease-in-out hover:scale-105 cursor-pointer' onClick={() => handlePrev()}>
                <MdNavigateBefore />
                <span>Prev</span>
            </div>
            )}
              <div className='border-[1px] rounded-[10px] py-[10px] px-[15px] bg-blue-500 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-blue-400 transition hover:duration-300 hover:ease-in-out hover:scale-105 text-white cursor-pointer' onClick={() => handleNext()}> 
                <span>Next</span>
                <MdNavigateNext />
            </div>          
          </div>
          </div>        
          <ListQuestions 
            flattenedQuestions={flattenedQuestions}
          />
          
          
        </div>
      )}
    </div>
  );
};

export default Quiz;
