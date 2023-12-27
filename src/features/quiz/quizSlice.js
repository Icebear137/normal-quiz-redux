import { createSlice } from '@reduxjs/toolkit';
import questions from './questions'; // Adjust the path accordingly

const flattenQuestions = (questions, parentParagraph = []) => {
  let flatQuestions = [];

  for (const question of questions) {
    let combinedParentParagraph = [...parentParagraph];

    if (question.parentID !== null) {
      combinedParentParagraph.push(
        question.parentParagraph || question.questionParagraph
      );
    }

    const flatQuestion = {
      questionID: question.questionID,
      questionType: question.questionType,
      subQuestionCount: question.subQuestionCount,
      questionText: question.questionText,
      answerOptions: question.answerOptions,
      parentParagraph: combinedParentParagraph,
      parentID: question.parentID,
    };

    flatQuestions.push(flatQuestion);

    if (question.questionOptions) {
      flatQuestions = flatQuestions.concat(
        flattenQuestions(question.questionOptions, combinedParentParagraph)
      );
    }
  }

  return flatQuestions;
};

const flattenedQuestions = flattenQuestions(
  questions.filter((question) => question.questionType === 1)
);

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffleAnswerOptions = (questions) => {
  return questions.map((question) => {
    if (question.questionType === 0) {
      return {
        ...question,
        answerOptions: shuffleArray(question.answerOptions),
      };
    } else if (question.questionType === 1) {
      const flatQuestions = flattenQuestions(
        question.questionOptions || [],
        question.questionParagraph,
        question.questionID
      );
      return {
        ...question,
        questionOptions: shuffleArray(flatQuestions).map(
          (subQuestion) => ({
            ...subQuestion,
            isCorrect: false,
          })
        ),
      };
    }

    return question;
  });
};

const shuffleQuestions = (questions) => {
  const flattenedQuestions = flattenQuestions(questions.filter((question) => question.questionType === 1));
  const shuffledByType = flattenedQuestions.reduce((acc, question) => {
    acc[question.questionType] = acc[question.questionType] || [];
    acc[question.questionType].push(question);
    return acc;
  }, {});

  const shuffledQuestions = Object.values(shuffledByType).map((group) =>
    shuffleArray(group)
  );

  return [].concat(...shuffledQuestions).map((question) => ({
    ...question,
    questionOptions: shuffleAnswerOptions(question.questionOptions || []),
  }));
};


const shuffledQuestions = shuffleQuestions(questions);
const flattenedQuestion = flattenQuestions(questions);

const flattenedQuestionsCount = () => {
  return flattenedQuestion.filter(flattenQuestions => flattenQuestions.questionType === 0).length;
}

const flattenedQuestionsFilter = () => {
  return flattenedQuestion.filter(flattenQuestions => flattenQuestions.questionType === 0);
}

console.log(shuffledQuestions);
console.log(flattenQuestions(questions));

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuestion: 0,
    correct: false,
    score: 0,
    questionsCount: flattenedQuestionsCount(),
    showScore: false,
    questionsWithShuffledOptions: shuffledQuestions,
    flattenedQuestions: flattenedQuestionsFilter(flattenedQuestion),
  },
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    prevQuestion: (state) => {
      state.currentQuestion -= 1;
    },
    answerCorrectly: (state, action) => {
      state.correct = action.payload;
    },
    previousAnswer: (state, action) => {
      state.prevAnswer = action.payload;
    },
    increaseScore: (state) => {
      state.score += 1;
    },
    decreaseScore: (state) => {
      state.score -= 1;
    },
    setShowScore: (state, action) => {
      state.showScore = action.payload;
    },
    resetQuestion: (state) => {
      state.currentQuestion = 0;
      state.questionsWithShuffledOptions = shuffleQuestions(questions);
    },
    resetScore: (state) => {
      state.score = 0;
    },
  },
});

export const {
  nextQuestion,
  prevQuestion,
  answerCorrectly,
  previousAnswer,
  increaseScore,
  decreaseScore,
  setShowScore,
  resetQuestion,
  resetScore,
} = quizSlice.actions;

export default quizSlice.reducer;
