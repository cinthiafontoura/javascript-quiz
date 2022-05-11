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
const scorePoints = document.getElementById('score_points');

let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

let score = 0;
const SCORE_POINTS = 100;

/**
 * Wait the content load before start the game and get the username
 */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('new-user');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.getElementById('message');

    if (username.value === " ") {      
      message.innerText = 'Enter a valid username';
      message.setAttribute('class', 'message');
    } else {
      message.innerText = 'Enter a username to start the game';
      message.removeAttribute('class', 'message');
      loadQuiz();
    }    
  })  
});  

/**
 * Get data from the quizQuestion constant and add to the DOM
 */
function loadQuiz() {  
  start.style.display = 'none'; // Hide the starter content  
  quiz.style.display = 'block'; // Show the game  
  
  const questionCounter = currentQuestion + 1;
  const totalQuestions = quizQuestion.length;  

  const progress = document.getElementById('progress');
  progress.innerHTML = `Question ${questionCounter} of ${totalQuestions}`;

  const progressBarFull = document.querySelector('#progress__bar--full');
  progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;

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
        incrementScore(SCORE_POINTS);
        nextQuestion();                
      } else {
        wrongAnswer.innerText = ++incorrectAnswer;
        nextQuestion();
      }      
    });        
  }
}

/**
 * Increment the score points by 100 when the question is correct
 */
function incrementScore(num) {
  
  score +=num;
  scorePoints.innerText = score;
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

  rankingMessage();
  addNewScore();  
  
  const playAgainBtn = document.getElementById('play-again');
  playAgainBtn.addEventListener('click', playAgain);

  const playAgainNewUserBtn = document.getElementById('play-again-friend');
  playAgainNewUserBtn.addEventListener('click', playNewUser);
}

/**
 * A motivational message and a gif according to the result 
 */
function rankingMessage() {
  let rankingTitle; 
  let rankingScore;   
    
  switch (score) {
    case 0:
      rankingTitle = 'You are not even close!';
      rankingScore = `<iframe src="https://giphy.com/embed/LYd7VuYqXokv20CaEG" width="242" height="288" frameBorder="0"></iframe>`;
      break;
    
    case 100:
      rankingTitle = 'At least you tried';
      rankingScore = `<iframe src="https://giphy.com/embed/myuLckXB7OjfGw1gSb" width="240" height="450" frameBorder="0"></iframe>`;
      break;
  
    case 200:
      rankingTitle = 'Keep tring and one day you will get there!';
      rankingScore = `<iframe src="https://giphy.com/embed/Jk4ZT6R0OEUoM" width="240" height="213" frameBorder="0"></iframe>`;
      break;

    case 300:
      rankingTitle = 'I know JavaScript has its triks';
      rankingScore = `<iframe src="https://giphy.com/embed/nfLpqTrNPpqcE" width="240" height="190" frameBorder="0" ></iframe>`;
      break;

    case 400:
      rankingTitle = 'This close!';
      rankingScore = `<iframe src="https://giphy.com/embed/yoOotVRp4JMxVTEgDy" width="240" height="135" frameBorder="0" ></iframe>`;
      break;

    case 500:
      rankingTitle = 'WOW! You born to do it';
      rankingScore = `<iframe src="https://giphy.com/embed/XE8iJs1sT7xTM5lafa" width="240" height="240" frameBorder="0"></iframe>`;
      break;
  
    default:
      rankingTitle = 'Your Score';
      rankingScore = score;
  }

  document.getElementById('ranking-title').innerHTML = rankingTitle;
  document.getElementById('ranking-score').innerHTML = rankingScore; 
}

/**
 * Add new score to the ranking list
 */
function addNewScore() {
  const newUser = document.createElement('li');
  newUser.innerHTML = username.value;
  
  const newScore = document.createElement('span');
  newScore.innerHTML = score;  

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
  scorePoints.innerText = '0';

  score = 0;
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
}
