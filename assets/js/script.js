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

const username = document.getElementById('username');
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const rankingBox = document.getElementById('ranking-box');
const rightAnswer = document.getElementById('right-answer');
const wrongAnswer = document.getElementById('wrong-answer');

let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

/**
 * Wait the content load before start the game and get the username
 */
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('new-user');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    loadQuiz();
  })
});  

/**
 * Get data from the quizQuestion constant and add to the DOM
 */
function loadQuiz() {  
  start.style.display = 'none'; // Hide the starter content  
  quiz.style.display = 'block'; // Show the game
  
  document.getElementById('question_number').innerText = currentQuestion + 1; // Show how many questions are left
  document.getElementById('total_question').innerText = quizQuestion.length; // Show how many questions the quiz have
  
  const currentQuestionData = quizQuestion[currentQuestion];

  document.getElementById('quiz__question').innerText = currentQuestionData.question;
  document.getElementById('a__option').innerText = currentQuestionData.a;
  document.getElementById('b__option').innerText = currentQuestionData.b;
  document.getElementById('c__option').innerText = currentQuestionData.c;
  document.getElementById('d__option').innerText = currentQuestionData.d;    
}

checkAnswer();

/**
 * Check if the answer is correct and atulize the score
 */
function checkAnswer() {
  const options = document.querySelectorAll('.quiz__option');  

  for (let option of options) {
    option.addEventListener('click', function () {
      let answer = this.getAttribute('id');
      if (answer === quizQuestion[currentQuestion].correct) {
        rightAnswer.innerText = ++correctAnswer;
        nextQuestion();                
      } else {
        wrongAnswer.innerText = ++incorrectAnswer;
        nextQuestion();
      }      
    });        
  }
}

/**
 * Go to the next question and show the results at the end of the game with a option to play again
 */
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizQuestion.length) {
    loadQuiz();
  } else {   
    quiz.style.display = "none"; // Hide the quiz content     
    displayRanking();    
  }        
}

/**
 * Display a ranking at the end of the game and buttons to play again with the same or a new username
 */
function displayRanking() {
  rankingBox.style.display = "block";    

  addNewScore();  

  const congrats = document.getElementById('congrats');


  document.getElementById('correct-answer').innerText = correctAnswer;
  document.getElementById('total').innerText = quizQuestion.length;

  const playAgainBtn = document.getElementById('play-again');
  playAgainBtn.addEventListener('click', playAgain);

  const playAgainNewUserBtn = document.getElementById('play-again-friend');
  playAgainNewUserBtn.addEventListener('click', playNewUser);
}

/**
 * Add new score to the ranking list
 */
function addNewScore() {
  const newUser = document.createElement('li');
  newUser.innerHTML = username.value;
  
  const newScore = document.createElement('span');
  newScore.innerHTML = correctAnswer;  

  newUser.appendChild(newScore);

  const ranking = document.getElementById('ranking-list');
  ranking.appendChild(newUser);
}

/**
 * Restart the game and give a option to create a new username
 */
function playNewUser() {
  start.style.display = 'block'; 
  quiz.style.display = 'none';
  rankingBox.style.display = 'none';

  username.value = '';
  restartValues();  
}

/**
 * Restart the game with the same username
 */
function playAgain() {
  rankingBox.style.display = 'none';

  restartValues();
  loadQuiz();
}

/**
 * Back the results to zero
 */
function restartValues() {
  rightAnswer.innerText = '0';
  wrongAnswer.innerText = '0';

  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
}
