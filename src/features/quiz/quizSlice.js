import { createSlice } from "@reduxjs/toolkit";
import questions from "./questions"; // Adjust the path accordingly

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

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const flattenedQuestion = flattenQuestions(questions);

const flattenedQuestionsCount = () => {
  return flattenedQuestion.filter(
    (flattenQuestions) => flattenQuestions.questionType === 0
  ).length;
};

const flattenedQuestionsFilter = () => {
  return flattenedQuestion.filter(
    (flattenQuestions) => flattenQuestions.questionType === 0
  );
};

const flatQuestionShuffled = shuffleArray(
  flattenedQuestionsFilter(flattenedQuestion)
);

console.log(flattenedQuestion);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    currentQuestion: 0,
    correct: false,
    score: 0,
    questionsCount: flattenedQuestionsCount(),
    showScore: false,
    flattenedQuestions: [...flatQuestionShuffled],
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
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setShowScore: (state, action) => {
      state.showScore = action.payload;
    },
    resetQuestion: (state) => {
      state.currentQuestion = 0;
      state.flattenedQuestions = shuffleArray(flatQuestionShuffled);
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
  setCurrentQuestion,
  correctAnswers,
  setScore,
  setShowScore,
  resetQuestion,
  resetScore,
} = quizSlice.actions;

export default quizSlice.reducer;
