import { setCurrentQuestion } from "./quizSlice";
import { useDispatch } from "react-redux";

const ListQuestions = (props) => {
    const { flattenedQuestions } = props;
    const dispatch = useDispatch();

    const handleChangeCurrentQuestion = (index) => {
        dispatch(setCurrentQuestion(index));
    };

    return (
        <div className='flex flex-wrap border-[1px] rounded-[10px] shadow-sm p-[20px] w-[300px] min-w-[300px]'>
            <div className="question-list flex flex-wrap items-start gap-2">
                {flattenedQuestions.map((question, index) => (
                    <div
                        className="question-count flex items-center justify-center text-[20px] cursor-pointer border-[1px] rounded-[10px] shadow-sm h-[40px] w-[40px] text-center bg-white hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105 m-1"
                        key={index}
                        onClick={() => handleChangeCurrentQuestion(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListQuestions;
