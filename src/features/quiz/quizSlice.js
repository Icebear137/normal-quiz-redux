import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getQuestions = async () => {
  try {
    const response = await axios.get(
      'https://quizapi.io/api/v1/questions?apiKey=BORDzSEO24fBpViv8JmQidSF4UaYcd49qVhxbXxu&category=code&limit=20&tags=JavaScript&offset=20'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

const fetchQuestions = async () => {
  const data = await getQuestions();
  const transformedData = data.map((item, index) => ({
    questionID: index + 1,
    questionText: item.question,
    answerOptions: Object.keys(item.answers)
    .filter((key) => item.answers[key] !== null) // Remove null answerText
    .map((key) => ({
      answerText: item.answers[key],
      isCorrect: key === item.correct_answer,
    })),
  }));

  console.log('transformedData', transformedData);

  return transformedData; // Return the transformed data
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const initializeQuestions = async () => {
  const transformedData = await fetchQuestions();

  // Update the questions array with the transformed data
  const questions = transformedData;

  // Shuffling answer options for each question
  const questionsWithShuffledOptions = questions.map((question) => ({
    ...question,
    answerOptions: shuffleArray(question.answerOptions),
  }));

  return {
    questions,
    questionsWithShuffledOptions,
  };
};

// Call the async function to initialize the questions
const { questions, questionsWithShuffledOptions } = await initializeQuestions();

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
    resetQuestion: (state) => {
      state.currentQuestion = 0;
      state.questionsWithShuffledOptions = shuffleArray(state.questionsWithShuffledOptions);
    },
  },
});

export const { nextQuestion, increaseScore, setShowScore, resetQuestion, resetPersistedState } = quizSlice.actions;

export default quizSlice.reducer;
