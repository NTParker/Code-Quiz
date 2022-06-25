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

let currentQuiz = 0;
let score = 0;

welcomePage();
loadQuiz();

function welcomePage() {
  questionEl.innerText = "Welcome to My Coding Quiz!";
}

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
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

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>

            <button onclick="location.reload()">Reload</button>
            `;
    }
  }
});
