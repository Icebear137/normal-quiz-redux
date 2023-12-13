import { useSelector } from "react-redux";
const Answers =() => {
    const { questionsWithShuffledOptions } = useSelector((state) => state.quiz);

    return (
        <div>
            <h1>Answers</h1>
            <div>
                {questionsWithShuffledOptions.map((question, index) => (
                <div key={index}>
                    <span>{question.questionText}</span>
                    <ul>
                    {question.answerOptions.map((answerOption, i) => (
                        answerOption.isCorrect ? (
                        <li key={i}>{answerOption.answerText}</li>
                        ) : null
                    ))}
                    </ul>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Answers;