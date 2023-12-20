import { createSlice } from '@reduxjs/toolkit';
import questions from './questions'; // Adjust the path accordingly

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
      // Shuffle answer options for normal questions
      return {
        ...question,
        answerOptions: shuffleArray(question.answerOptions),
      };
    } else if (question.questionType === 1) {
      // Shuffle answer options for paragraph questions
      const shuffledParagraphOptions = question.questionOptions.map((paragraphOption) => ({
        ...paragraphOption,
        answerOptions: shuffleArray(paragraphOption.answerOptions),
      }));

      return {
        ...question,
        questionOptions: shuffledParagraphOptions,
      };
    }

    return question;
  });
};

const shuffleQuestions = (questions) => {
  const normalQuestions = questions.filter((q) => q.questionType === 0);
  const paragraphQuestions = questions.filter((q) => q.questionType === 1);

  // Shuffle answer options for normal and paragraph questions
  const shuffledQuestions = shuffleAnswerOptions(normalQuestions).concat(
    shuffleAnswerOptions(paragraphQuestions)
  );

  // Shuffle the combined questions
  return shuffleArray(shuffledQuestions);
};

const shuffledQuestions = shuffleQuestions(questions);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuestion: 0,
    score: 0,
    showScore: false,
    questionsWithShuffledOptions: shuffledQuestions,
  },
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    prevQuestion: (state) => {
      state.currentQuestion -= 1;
      state.score -= 1;
    },
    increaseScore: (state) => {
      state.score += 1;
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
  increaseScore,
  setShowScore,
  resetQuestion,
  resetScore,
} = quizSlice.actions;

export default quizSlice.reducer;
