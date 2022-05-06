// Questions for the game
const quizQuestion = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    a: '<javascript>',
    b: '<js>',
    c: '<script>',
    d: '<scripting>',
    correct: 'c',
  },
  {
    question: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
    a: '#demo.innerHTML = "Hello World!";',
    b: 'document.getElement("p").innerHTML = "Hello World!";',
    c: 'document.getElementById("demo").innerHTML = "Hello World!";',
    d: 'document.getElementByName("p").innerHTML = "Hello World!";',
    correct: 'c',
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    a: 'The <head> section',
    b: 'The <footer>',
    c: 'The <body> section',
    d: 'Both the <head> section and the <body> section are correct',
    correct: 'd',
  },
  {
    question: 'How do you create a function in JavaScript?',
    a: 'function myFunction()',
    b: 'function = myFunction()',
    c: 'function:myFunction()',
    d: 'function ${myFunction()}',
    correct: 'a',
  },
  {
    question: 'How to write an IF statement in JavaScript?',
    a: 'if i = 5 then',
    b: 'if i == 5 then',
    c: 'if i = 5',
    d: 'if (i == 5)',
    correct: 'd',
  },
];

const question = document.getElementById('quiz__question');
const a_option = document.getElementById('a__option');
const b_option = document.getElementById('b__option');
const c_option = document.getElementById('c__option');
const d_option = document.getElementById('d__option');

let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

loadQuiz();

function loadQuiz() {
  
  const currentQuestionData = quizQuestion[currentQuestion];

  question.innerText = currentQuestionData.question;
  a_option.innerText = currentQuestionData.a;
  b_option.innerText = currentQuestionData.b;
  c_option.innerText = currentQuestionData.c;
  d_option.innerText = currentQuestionData.d;
}