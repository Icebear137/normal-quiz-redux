import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import questions from '../features/quiz/questions';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;
