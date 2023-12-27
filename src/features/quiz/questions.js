const questions = [
    {
      questionID: "1",
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
      questionID: "2",
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
      questionID: "3",
      questionType: 1,
      subQuestionCount: 4,
      questionParagraph: 'This is a paragraph question. Take a look at the code below:',
      questionOptions: [
        {
          questionID: "3_1",
          questionType: 0,
          subQuestionCount: 1,
         questionText: 'This is the first answer option for the paragraph question 1.', 
         answerOptions: [
          { answerText: 'false.', isCorrect: false },
          { answerText: 'true.', isCorrect: true },
          { answerText: 'false', isCorrect: false },
          { answerText: 'false', isCorrect: false },
        ]},
        {
          questionID: "3_2",
          questionType: 0,
          subQuestionCount: 1,
          questionText: 'This is the second answer option for the paragraph question 2.', 
         answerOptions: [
          { answerText: 'false.', isCorrect: false },
          { answerText: 'false.', isCorrect: false },
          { answerText: 'true.', isCorrect: true },
          { answerText: 'false', isCorrect: false },
        ]},
        //create a new paragraph question
        {
          questionID: "3_3",
          questionType: 1,
          subQuestionCount: 2,
          questionParagraph: 'This is a paragraph question. Take a look at the code below lvl 2:',
          questionOptions: [
            {
              questionID: "3_3_1",
              questionType: 0,
              subQuestionCount: 1,
             questionText: 'This is the first answer option for the paragraph question 1 lvl 2.', 
             answerOptions: [
              { answerText: 'false.', isCorrect: false },
              { answerText: 'true.', isCorrect: true },
              { answerText: 'false', isCorrect: false },
              { answerText: 'false', isCorrect: false },
            ]},
            {
              questionID: "3_3_2",
              questionType: 0,
              subQuestionCount: 1,
              questionText: 'This is the second answer option for the paragraph question 2 lvl 2.', 
             answerOptions: [
              { answerText: 'false.', isCorrect: false },
              { answerText: 'false.', isCorrect: false },
              { answerText: 'true.', isCorrect: true },
              { answerText: 'false', isCorrect: false },
            ]},
          ],
        },
        {
          questionID: "3_4",
          questionType: 0,
          subQuestionCount: 1,
          questionText: 'This is the third answer option for the paragraph question 3.', 
         answerOptions: [
          { answerText: 'false.', isCorrect: false },
          { answerText: 'false.', isCorrect: false },
          { answerText: 'false.', isCorrect: false },
          { answerText: 'true.', isCorrect: true },
          ]
        },
      ],
    }
  ];
  
  export default questions;
  