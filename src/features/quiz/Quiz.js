import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  prevQuestion,
  updateFlattenedQuestions,
  setScore,
  setShowScore,
  resetQuestion,
  resetScore,
} from "./quizSlice";
import Question from "./Question";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Result from "./Result";
import ListQuestions from "./ListQuestions";
import Timer from "./Timer";
import _ from "lodash";

const Quiz = () => {
  const dispatch = useDispatch();
  const { currentQuestion, questionsCount, showScore, flattenedQuestions } =
    useSelector((state) => state.quiz);

  const [resetTimer, setResetTimer] = useState(false);

  const allQuestionsAnswer = useRef(Array(questionsCount).fill(false));
  const questionAnswered = useRef(Array(questionsCount).fill(null));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [questionAnswerCount, setQuestionAnswerCount] = useState(0);

  useEffect(() => {
    if (showScore) {
      const count = allQuestionsAnswer.current.filter(
        (answer) => answer
      ).length;
      const answered = questionAnswered.current.filter(
        (answer) => answer !== null
      ).length;
      setQuestionAnswerCount(answered);
      setCorrectAnswersCount(count);
      console.log(answered); // Display the answered questions count in the console.
      console.log(count); // Display the correct answers count in the console.
    } else {
      setCorrectAnswersCount(0); // Reset the count when not in showScore state
    }
  }, [allQuestionsAnswer, questionAnswered, showScore]);

  const handleNext = () => {
    const currentQuestionData = flattenedQuestions[currentQuestion];

    if (
      currentQuestionData.answerOptions.every(
        (item) => item.isSelected === item.isCorrect
      )
    ) {
      allQuestionsAnswer.current[currentQuestion] = true;
    }

    if (
      currentQuestionData.answerOptions.every(
        (item) => item.isSelected === false
      )
    ) {
      questionAnswered.current[currentQuestion] = null;
    } else {
      questionAnswered.current[currentQuestion] = true;
    }

    console.log(questionAnswered.current);

    dispatch(nextQuestion());

    if (currentQuestion === questionsCount - 1) {
      dispatch(setScore(correctAnswersCount));
      dispatch(setShowScore(true));
      dispatch(resetQuestion());
    }
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleTimeExpired = () => {
    dispatch(setScore(correctAnswersCount));
    dispatch(setShowScore(true));
    dispatch(resetQuestion());
  };

  const handleReset = () => {
    allQuestionsAnswer.current = Array(questionsCount).fill(false);
    questionAnswered.current = Array(questionsCount).fill(null);
    dispatch(resetScore());
    dispatch(setShowScore(false));
    // Set resetTimer to a new value to trigger Timer reset
    setResetTimer((prev) => !prev);
    setTimeout(() => {
      setResetTimer(false);
    }, 10);
  };

  const handleCheckbox = (answerId, questionId) => {
    let clone = _.cloneDeep(flattenedQuestions);
    let question = clone.find((item) => +item.questionID === +questionId);

    if (question && question.answerOptions) {
      question.answerOptions = question.answerOptions.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      let index = clone.findIndex((item) => +item.questionID === +questionId);
      if (index !== -1) {
        clone[index] = question;
        dispatch(updateFlattenedQuestions(clone));
      }
    }
  };

  return (
    <div className="quiz flex m-auto w-full ">
      {showScore ? (
        <Result
          correctAnswersCount={correctAnswersCount}
          questionAnswerCount={questionAnswerCount}
          questionsCount={questionsCount}
          handleReset={handleReset}
        />
      ) : (
        <div className="flex gap-3 p-[20px] w-full h-fit place-content-between ">
          <Timer
            timeLimit={30}
            onTimeExpired={handleTimeExpired}
            resetTimer={resetTimer}
          />
          <div className=" border-[1px]  rounded-[10px] shadow-sm p-[20px] w-full ">
            <Question
              flattenedQuestions={flattenedQuestions[currentQuestion]}
              handleCheckbox={handleCheckbox}
            />
            <div className="flex place-content-between bottom-0 p-[20px] mt-[30px]">
              {currentQuestion === 0 ? null : (
                <div
                  className="border-[1px] rounded-[10px] py-[10px] px-[15px] bg-gray-200 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-gray-50 transition hover:duration-300 hover:ease-in-out hover:scale-105 cursor-pointer"
                  onClick={() => handlePrev()}
                >
                  <MdNavigateBefore />
                  <span>Prev</span>
                </div>
              )}
              <div
                className="border-[1px] rounded-[10px] py-[10px] px-[15px] bg-blue-500 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-blue-400 transition hover:duration-300 hover:ease-in-out hover:scale-105 text-white cursor-pointer"
                onClick={() => handleNext()}
              >
                <span>Next</span>
                <MdNavigateNext />
              </div>
            </div>
          </div>
          <ListQuestions flattenedQuestions={flattenedQuestions} />
        </div>
      )}
    </div>
  );
};

export default Quiz;
