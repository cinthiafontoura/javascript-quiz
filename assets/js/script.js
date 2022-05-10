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

let start = document.getElementById('start');
let quiz = document.getElementById('quiz');
let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

// Wait the content load before start the game
document.addEventListener('DOMContentLoaded', function () {
  let startBtn = document.getElementById('start-game');
  startBtn.addEventListener('click', loadQuiz);
});  

/**
 * Get data from the quizQuestion constant and add to the DOM
 */
function loadQuiz() {

  start.style.display = "none"; // Hide the starter content
  quiz.style.display = "block"; // Show the game
  
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

  const options = document.getElementsByClassName(' quiz__option');

  for (let option of options) {
    option.addEventListener('click', function () {
      let answer = this.getAttribute('id');
      console.log(answer);

      if (answer === quizQuestion[currentQuestion].correct) {
        console.log('correct');
        document.getElementById('right-answer').innerText = ++correctAnswer;
        nextQuestion();
                
      } else {
        console.log('wrong choice');
        document.getElementById('wrong-answer').innerText = ++incorrectAnswer;
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
 * Display results and ranking at the end of the game with a button to play again
 */
function displayRanking() {

  const rankingBox = document.getElementById('ranking-box');
  rankingBox.style.display = "block";

  const playAgainBtn = document.getElementById('play-again');
  playAgainBtn.addEventListener('click', playAgain);

  const playAgainNewUserBtn = document.getElementById('play-again-friend');
  playAgainNewUserBtn.addEventListener('click', playNewUser);

  const username = document.getElementById('username').value;

  const newUser = document.createElement('li');
  newUser.innerHTML = username;
  
  const newScore = document.createElement('span');
  newScore.innerHTML = correctAnswer;  

  newUser.appendChild(newScore);

  const ranking = document.getElementById('ranking-list');

  ranking.appendChild(newUser);

}

function playNewUser() {
  start.style.display = "block"; 
  quiz.style.display = "none";

  username.value = "";

  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
}

function playAgain() {
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;

  loadQuiz();
}