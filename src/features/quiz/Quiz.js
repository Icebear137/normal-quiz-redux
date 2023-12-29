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
import { TbReload } from "react-icons/tb";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

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
    <div className="quiz flex m-auto border-[1px] min-w-[1000px]  rounded-[10px] shadow-sm">
      {showScore ? (
        <div className="score-section flex flex-col m-auto min-h-[200px] w-full p-[20px]">
          <div className='flex flex-col m-auto'>
            <span className='text-[30px] font-semibold text-blue-500'>You scored</span> 
            <div className='text-center'>
              {(() => {
                let result;

                switch (true) {
                  case correctAnswersCount < questionsWithShuffledOptions.length / 2:
                    result = <span className='text-[40px] font-semibold text-red-600'>{correctAnswersCount}</span>;
                    break;
                  case correctAnswersCount === questionsWithShuffledOptions.length :
                    result = <span className='text-[40px] font-semibold text-green-600'>{correctAnswersCount}</span>;
                    break;
                  default:
                    result = <span className='text-[40px] font-semibold text-blue-600'>{correctAnswersCount}</span>;
                    break;
                }

                return (
                  <>
                    {result}
                    <span>/</span>
                    <span>{questionsWithShuffledOptions.length}</span>
                  </>
                );
              })()}
            </div>
          </div>
          <div className='border-[1px] rounded-[10px] py-[10px] px-[15px] bg-gray-200 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-gray-50 transition hover:delay-150 hover:duration-300 hover:ease-in-out hover:scale-105' onClick={() => handleReset()}>
            <TbReload />
            <span>Reset</span>
          </div>
        </div>
      ) : (
        <div className='flex flex-col p-[20px] w-full h-fit place-content-between'>
          <Question
            question={questionsWithShuffledOptions[currentQuestion]}
            flattenedQuestions={flattenedQuestions[currentQuestion]}
          />
          <div className='flex place-content-between bottom-0 p-[20px] mt-[30px]'>
            {currentQuestion === 0 ? null : (
              <div className='border-[1px] rounded-[10px] py-[10px] px-[15px] bg-gray-200 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-gray-50 transition hover:duration-300 hover:ease-in-out hover:scale-105' onClick={() => handlePrev()}>
                <MdNavigateBefore />
                <span>Prev</span>
            </div>
            )}
              <div className='border-[1px] rounded-[10px] py-[10px] px-[15px] bg-blue-500 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-blue-400 transition hover:duration-300 hover:ease-in-out hover:scale-105 text-white' onClick={() => handleNext()}> 
                <span>Next</span>
                <MdNavigateNext />
            </div>          
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
