const quizData = [
  {
    question: "JavaScript is a ___-side programming language",
    a: "Client",
    b: "Server",
    c: "Both",
    d: "None",
    correct: "c",
  },
  {
    question: "Which language runs in a web browser?",
    a: "C",
    b: "Java",
    c: "Python",
    d: "javascript",
    correct: "d",
  },
  {
    question:
      "Which of the following will write the message “Hello DataFlair!” in an alert box?",
    a: "alertBox('Hello DataFlair!');",
    b: "alert(Hello DataFlair!);",
    c: "msgAlert('Hello DataFlair!');",
    d: "alert('Hello DataFlair!');",
    correct: "d",
  },
  {
    question: "How do you find the minimum of x and y using JavaScript?",
    a: "min(x,y);",
    b: "Math.min(x,y)",
    c: "Math.min(xy)",
    d: "min(xy);",
    correct: "b",
  },
  {
    question:
      "If the value of x is 40, then what is the output of the following program? (x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
    a: "ReferenceError",
    b: "Divisible by 10",
    c: "Not divisible by 10",
    d: "None of the above",
    correct: "b",
  },
  {
    question:
      "Which JavaScript label catches all the values, except for the ones specified?",
    a: "catch",
    b: "label",
    c: "try",
    d: "default",
    correct: "d",
  },
  {
    question:
      "Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
    a: "if(x 2)",
    b: "if(x = 2)",
    c: "if(x == 2)",
    d: "if(x != 2 )",
    correct: "c",
  },
  {
    question: "What will the code return? Boolean(3 < 7)",
    a: "true",
    b: "false",
    c: "NaN",
    d: "SyntaxError",
    correct: "a",
  },
  {
    question:
      "What is the output of the following code in the console? var x = 0; function fun(){ ++x; this.x = x; return x; } var bar = new new fun; console.log(bar.x);",
    a: "ReferenceError",
    b: "undefined",
    c: "1",
    d: "TypeError",
    correct: "d",
  },
  {
    question:
      "Which is the correct JavaScript syntax to change the HTML content given here? <p id=”test”>Hello World!</p>",
    a: "document.getElementById(“test”).innerHTML = “Hello DataFlair!”;",
    b: "document.getElementsById(“test”).innerHTML = “Hello DataFlair!”;",
    c: "document.getElementById(test).innerHTML = “Hello DataFlair!”;",
    d: "document.getElementByTagName(“p”)[0].innerHTML = “Hello DataFlair!”;",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const timer = document.getElementById("timer");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");

let currentQuestion = 0;
let score = 0;

let started = false;
let timeoutTime;

const NO_OF_HIGH_SCORES = 10;
let highScores;
let highScoreString;
let lowestScore;
let savedHS = false;

welcome();

function welcome() {
  submitBtn.onclick = buttonClick;
  questionEl.innerText = "Welcome to My Coding Quiz!";
  hideAnswerElements();
  submitBtn.innerText = "Begin Quiz";
}

function deductTime() {
  timeoutTime = timeoutTime - 10000;
}

function buttonClick() {
  const answer = getSelected();
  if (!started) {
    started = true;
    submitBtn.innerText = "Submit";
    startTheTimer();
    loadQuestion();
  }
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    } else {
      deductTime();
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
}

function endQuiz(timeout = false) {
  quiz.innerHTML = `${
    timeout ? `<h2 id="timeout">You Ran Out of Time</h2>` : ""
  } 
            <h2>You answered ${score}/${
    quizData.length
  } questions correctly</h2>`;
  setTimeout(checkIfHighScore, 3000);
}

function saveHighScore() {
  const name = prompt("You got a high score! Enter your initials: ");
  const newHighScore = { score, name };

  highScores.push(newHighScore);
  highScores.sort((s1, s2) => s2.score - s1.score);
  highScores.splice(NO_OF_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  savedHS = true;
}

function getHighScores() {
  highScoreString = localStorage.getItem("highScores");
  highScores = JSON.parse(highScoreString) ?? [];
  lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
}

function checkIfHighScore() {
  getHighScores();
  if (score > lowestScore && !savedHS) {
    saveHighScore();
  }
  showHighScores();
}

function showHighScores() {
  getHighScores();
  // questionEl.innerText = "HIGH SCORES";
  const hsDisplay = document.createElement("div");
  const hsHeader = document.createElement("h2");
  hsHeader.innerText = "HIGH SCORES";
  hsDisplay.appendChild(hsHeader);
  const hsList = document.createElement("ul");
  highScores.forEach((highScore, i) => {
    const row = document.createElement("li");
    row.innerText = `${i + 1}: ${highScore.name} - ${highScore.score}`;
    hsList.appendChild(row);
  });
  // document.replaceChild(answerEls, hsList);
  // document.replaceChild(
  //   submitBtn,
  //   '<button onclick="location.reload()">RELOAD</button>'
  // );
  hsDisplay.appendChild(hsList);
  quiz.innerHTML = "";
  let reloadBtn = document.createElement("div");
  reloadBtn.innerHTML = '<button onclick="location.reload()">Reload</button>';
  quiz.appendChild(hsDisplay);
  quiz.appendChild(reloadBtn);
}

function startTheTimer() {
  let minutes = 5;
  let seconds = 0;
  let lag = 2000;
  timeoutTime = new Date().getTime() + minutes * 60000 + seconds * 1000 + lag;

  // Run myfunc every second
  let myfunc = setInterval(function () {
    let now = new Date().getTime();
    let timeleft = timeoutTime - now;

    // Calculating the time left
    let displayMinutes = Math.floor(
      (timeleft % (1000 * 60 * 60)) / (1000 * 60)
    );
    if (displayMinutes < 10) {
      displayMinutes = "0" + displayMinutes;
    }
    let displaySeconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    if (displaySeconds < 10) {
      displaySeconds = " 0" + displaySeconds;
    }

    // Result is output to the specific element
    mins.innerHTML = displayMinutes + " : ";
    secs.innerHTML = displaySeconds;

    // Display the message when countdown is over
    if (timeleft <= 0) {
      clearInterval(myfunc);
      endQuiz(true);
    }
  }, 1000);
}

function loadQuestion() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuestion];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function hideAnswerElements() {
  a_text.innerText = "";
  b_text.innerText = "";
  c_text.innerText = "";
  d_text.innerText = "";
  answerEls.forEach((answerElement) => (answerElement.hidden = true));
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
    if (answerEl.hidden) answerEl.hidden = false;
  });
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function populateFakeHighScores() {
  let alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ret = [];
  for (let i = 0; i < 10; i++) {
    const val = {
      score: Math.floor(Math.random() * 10) + 1,
      name:
        alph[Math.floor(Math.random() * 26)] +
        alph[Math.floor(Math.random() * 26)],
    };
    ret.push(val);
  }
  return ret;
}
