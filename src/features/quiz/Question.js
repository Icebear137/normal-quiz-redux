import React from "react";
import { useSelector } from "react-redux";

const Question = ({ flattenedQuestions, handleCheckbox }) => {
  const { currentQuestion } = useSelector((state) => state.quiz);

  const handleHandleCheckbox = (e, aId, qId) => {
    handleCheckbox(aId, qId);
  };

  return (
    <>
      <div className="question-section">
        <div className="question-count text-[40px] font-semibold">
          <span>Question {currentQuestion + 1}</span>
        </div>
        {flattenedQuestions.parentParagraph?.map((paragraph, index) => (
          <p className="text-[30px] font-medium" key={index}>
            {paragraph}
          </p>
        ))}
        <div className="question-text text-[20px] font-medium">
          {flattenedQuestions.questionText}
        </div>
        <div className="answer-options pt-[30px] flex flex-col gap-[8px]">
          {flattenedQuestions.answerOptions?.map((option, index) => (
            <div key={index} className="answer-option">
              <label>
                <input
                  type="checkbox"
                  name={`question${currentQuestion}`}
                  className="mr-[10px]"
                  checked={option.isSelected}
                  value={index}
                  onChange={(e) => {
                    handleHandleCheckbox(
                      e,
                      option.id,
                      flattenedQuestions.questionID
                    );
                  }}
                />
                {option.answerText}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
