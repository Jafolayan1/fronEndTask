const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const correctText = document.getElementById('correct');
const correct1 = document.getElementById('correct1');
console.log(choices)

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let correct = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [{
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    {
        question: " What is does 'HTML' stands for?",
        choice1: "Hyper Text Markup Language",
        choice2: "Hyper Text Mark Language",
        choice3: "Hypre Text Markup Language",
        choice4: "Hype Test Markup Language",
        answer: 1
    },
    {
        question: "Inside which HTML element do we put the CSS link?",
        choice1: "<Css>",
        choice2: "<Link>",
        choice3: "<Head>",
        choice4: "<Body>",
        answer: 3
    },
];

// //CONSTANTS
const score_Bonus = 20;
const Max_Questions = 5;
const correct_Bonus = 1;


startGame = () => {
    questionCounter = 0;
    score = 0;
    correct = 0;
    availableQuesions = [...questions];
    console.log(availableQuesions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= Max_Questions) {
        localStorage.setItem("mostRecentScore", score);
        //GOTO END PAGE
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${Max_Questions}`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    console.log(availableQuesions);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);
        let classToApply = 'incorrect';

        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct'
        }
        if (classToApply === 'correct') {
            incrementScore(score_Bonus);
        }
        if (classToApply === 'correct') {
            incrementCorrect(correct_Bonus)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1100);

    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
incrementCorrect = Num => {
    correct += Num;
    correctText.innerText = correct;
}
startGame();