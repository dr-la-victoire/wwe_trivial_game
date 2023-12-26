// retrieving the elements from HTML
const question = document.getElementById("game-question");
const answers = Array.from(document.getElementsByClassName("text"));
//const getScore = document.getElementById("final-score");

// setting important variables we'll need
let currentQuestion = {};
let acceptAnswers = false;

let questionNumber = 0;
let remainingQuestions = [];
let score = 0;


// a list of the quiz questions
let questions = [
    {
        question: "Who won the 2010 Royal Rumble?",
        answer1: "John Cena",
        answer2: "Edge",
        answer3: "Batista",
        answer4: "Shawn Michaels",
        answer: 2
    },

    {
        question: "When did CM Punk cut his famous pipe bomb promo?",
        answer1: "2009",
        answer2: "2010",
        answer3: "2011",
        answer4: "2012",
        answer: 3
    },

    {
        question: "Who was not part of The Shield?",
        answer1: "Kassius Ohno",
        answer2: "Seth Rollins",
        answer3: "Dean Ambrose",
        answer4: "Roman Reigns",
        answer: 1,
    },
    
    {
        question: "Who ended The Undertaker's WrestleMania streak?",
        answer1: "Roman Reigns",
        answer2: "Brock Lesnar",
        answer3: "Edge",
        answer4: "Randy Ortorn",
        answer: 2,
    },
    
    {
        question: "Who is not part of the WWE Hall of Fame?",
        answer1: "Edge",
        answer2: "Rey Mysterio",
        answer3: "Mancho Man Randy Savage",
        answer4: "Ted Dibiase",
        answer: 3,
    },
    
    {
        question: "Who was Edge's final WWE opponent?",
        answer1: "Drew McIntyre",
        answer2: "CM Punk",
        answer3: "John Cena",
        answer4: "Sheamus",
        answer: 4,
    },
];


// some constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
 questionNumber = 0;
 score = 0; 
 remainingQuestions = [...questions];
 getNewQuestion();   
};

//displayScore = () => {
    //if (remainingQuestions.length == 0 || questionNumber >= MAX_QUESTIONS) {
        //getScore.innerText = `You scored ${score}`;
   // }
//};

getNewQuestion = () => {
    if (remainingQuestions.length == 0 || questionNumber >= MAX_QUESTIONS) {
        const url = `/end.html?score=${score}`;
        return window.location.assign(url);
    
    }

    questionNumber++;
    const questionIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    answers.forEach((answer) => {
        const number = answer.dataset['number'];
        answer.innerText = currentQuestion['answer' + number];
    });

    remainingQuestions.splice(questionIndex, 1);
    acceptAnswers = true;
};

answers.forEach((answer) => {
    answer.addEventListener('click', (e) => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
          selectedAnswer == currentQuestion.answer ? "correct" : "wrong";

          if (selectedAnswer == currentQuestion.answer) {
            score += CORRECT_BONUS;
          }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

startGame();