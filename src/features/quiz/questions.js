const questions = [
    {
      questionID: 1,
      questionType: 0,
      subQuestionCount: 1,
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false },
      ],
    },
    {
      questionID: 2,
      questionType: 0,
      subQuestionCount: 1,
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    //create a new paragraph question
    {
      questionID: 3,
      questionType: 1,
      subQuestionCount: 2,
      questionParagraph: 'This is a paragraph question. Take a look at the code below:',
      questionOptions: [
        {questionText: 'This is the first answer option for the paragraph question 1.', 
         answerOptions: [
          { answerText: 'false.', isCorrect: false },
          { answerText: 'true.', isCorrect: true },
          { answerText: 'false', isCorrect: false },
          { answerText: 'false', isCorrect: false },
        ]},
        {questionText: 'This is the second answer option for the paragraph question 2.', 
         answerOptions: [
          { answerText: 'false.', isCorrect: false },
          { answerText: 'false.', isCorrect: false },
          { answerText: 'true.', isCorrect: true },
          { answerText: 'false', isCorrect: false },
        ]},
      ],
    },
  ];
  
  export default questions;
  