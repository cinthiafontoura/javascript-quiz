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

const quiz = document.getElementById('quiz');

let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

document.addEventListener('DOMContentLoaded', loadQuiz());

/**
 * Get data from the quizQuestion constant and add to the DOM
 */
function loadQuiz() {

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

  const buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
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
    quiz.innerHTML = `
    <h2>Congratulations!</h2>
    <h3> You answered ${correctAnswer}/${quizQuestion.length} questions correctly.</h3>
    <button class="btn" onclick="location.reload()">Play again</button>
    `;
  }        
}
