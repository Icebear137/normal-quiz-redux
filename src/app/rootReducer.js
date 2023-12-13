import { combineReducers } from 'redux';
import quizReducer from '../features/quiz/quizSlice';

const rootReducer = combineReducers({
  quiz: quizReducer,
  // Add other reducers here if needed
});

export default rootReducer;
