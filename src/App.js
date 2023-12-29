import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './features/quiz/Quiz';

function App() {
  return (
    <div className='flex m-auto h-screen'>
      <Quiz />  
    </div>
  );
}

export default App;
