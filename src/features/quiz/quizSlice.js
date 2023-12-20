import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching questions
export const fetchQuestionsAsync = createAsyncThunk('quiz/fetchQuestions', async () => {
  try {
    const response = await axios.get(
      'https://quizapi.io/api/v1/questions?apiKey=BORDzSEO24fBpViv8JmQidSF4UaYcd49qVhxbXxu&category=code&limit=20&tags=JavaScript&offset=20'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
});

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuestion: 0,
    score: 0,
    showScore: false,
    questionsWithShuffledOptions: [],
    status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        const transformedData = action.payload.map((item, index) => ({
          questionID: index + 1,
          questionText: item.question,
          answerOptions: Object.keys(item.answers)
            .filter((key) => item.answers[key] !== null)
            .map((key) => ({
              answerText: item.answers[key],
              isCorrect: item.correct_answers[key + '_correct'] === 'true',
            })),
        }));

        state.questionsWithShuffledOptions = shuffleArray(transformedData);
        state.status = 'succeeded';
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { nextQuestion, increaseScore, setShowScore, resetQuestion, resetPersistedState } = quizSlice.actions;

export default quizSlice.reducer;
