import React from "react";
import { useSelector } from "react-redux";

const Answers = () => {
  const { questionsWithShuffledOptions } = useSelector((state) => state.quiz);

  return (
    <div>
      <h1>Correct Answers</h1>
      <div>
        {questionsWithShuffledOptions.map((question, index) => (
          <div key={index}>
            {question.questionType === 1 ? (
              // Display correct answers for paragraph type question
              <>
                <span>{question.questionParagraph}</span>
                <ul>
                    {question.questionOptions.map((paragraphQuestion, pIndex) => (
                        <div key={pIndex}>
                            <span>{paragraphQuestion.questionText}</span>
                            <ul>
                                {paragraphQuestion.answerOptions.map((answerOption, aIndex) => (
                                    // Display only correct answers
                                    answerOption.isCorrect ? <li key={aIndex}>{answerOption.answerText}</li> : null
                                ))}
                            </ul>
                        </div>
                    ))}
                </ul>
              </>
            ) : (
                // Display correct answers for normal question
                <>
                    <span>{question.questionText}</span>
                    <ul>
                        {question.answerOptions.map((answerOption, aIndex) => 
                            // Display only correct answers
                            answerOption.isCorrect ? <li key={aIndex}>{answerOption.answerText}</li> : null
                        )}
                    </ul>
                </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
