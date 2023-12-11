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

// Shuffling answer options for each question
const questionsWithShuffledOptions = questions.map((question) => ({
  ...question,
  answerOptions: shuffleArray(question.answerOptions),
}));

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuestion: 0,
    score: 0,
    showScore: false,
    questionsWithShuffledOptions: questionsWithShuffledOptions,
  },
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    increaseScore: (state) => {
      state.score += 1;
    },
    setShowScore: (state, action) => {
      state.showScore = action.payload;
    },
  },
});

export const { nextQuestion, increaseScore, setShowScore } = quizSlice.actions;

export default quizSlice.reducer;
