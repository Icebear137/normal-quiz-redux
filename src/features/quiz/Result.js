import { useDispatch, useSelector } from "react-redux";
import { setShowScore, resetQuestion, resetScore } from "./quizSlice";
import { TbReload } from "react-icons/tb";

const Result = (props) => {
  const {
    correctAnswersCount,
    questionsCount,
    questionAnswerCount,
    handleReset,
  } = props;

  return (
    <div className="score-section flex flex-col m-auto min-h-[200px] w-full p-[20px]">
      <div className="flex m-auto gap-[30px]">
        <div className="flex flex-col m-auto">
          <span className="text-[30px] font-semibold text-blue-500">
            You scored
          </span>
          <div className="text-center">
            {(() => {
              let result;

              switch (true) {
                case correctAnswersCount < questionsCount / 2:
                  result = (
                    <span className="text-[40px] font-semibold text-red-600">
                      {correctAnswersCount}
                    </span>
                  );
                  break;
                case correctAnswersCount === questionsCount:
                  result = (
                    <span className="text-[40px] font-semibold text-green-600">
                      {correctAnswersCount}
                    </span>
                  );
                  break;
                default:
                  result = (
                    <span className="text-[40px] font-semibold text-blue-600">
                      {correctAnswersCount}
                    </span>
                  );
                  break;
              }

              return (
                <>
                  {result}
                  <span>/</span>
                  <span>{questionsCount}</span>
                </>
              );
            })()}
          </div>
        </div>
        <div className="flex flex-col m-auto">
          <span className="text-[30px] font-semibold text-blue-500">
            Question answered
          </span>
          <div className="text-center">
            {(() => {
              let result;

              switch (true) {
                case questionAnswerCount < questionsCount / 2:
                  result = (
                    <span className="text-[40px] font-semibold text-red-600">
                      {questionAnswerCount}
                    </span>
                  );
                  break;
                case questionAnswerCount === questionsCount:
                  result = (
                    <span className="text-[40px] font-semibold text-green-600">
                      {questionAnswerCount}
                    </span>
                  );
                  break;
                default:
                  result = (
                    <span className="text-[40px] font-semibold text-blue-600">
                      {questionAnswerCount}
                    </span>
                  );
                  break;
              }

              return (
                <>
                  {result}
                  <span>/</span>
                  <span>{questionsCount}</span>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <div
        className="border-[1px] rounded-[10px] py-[10px] px-[15px] bg-gray-200 flex m-auto mt-[30px] items-center gap-[2px] hover:bg-gray-50 transition hover:delay-150 hover:duration-300 hover:ease-in-out hover:scale-105 cursor-pointer"
        onClick={() => handleReset()}
      >
        <TbReload />
        <span>Reset</span>
      </div>
    </div>
  );
};

export default Result;
