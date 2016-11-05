
/* The "quiz object" constructor, I wrote it before using JSON, I leave it for reference purposes later

function Quiz(question, possibleAnswers, rightAnswer) {
    this.question = question;
    this.possibleAnswers = possibleAnswers;
    this.rightAnswer = rightAnswer;
}
*/

// importing the JSON data, which is an array of objects (Quiz Objects), and then assigning it to a variable
var quizCol = JSON.parse(myData);

// a global variable to keep track of the current Quiz object that is being used
var currentQ = 0;

// a global variable to hold the total score of the player
var score = 0;

// a global variable that will hold the moment when the user answered the question, the seconds counter
var elapsedSeconds = 1;

var questionP = document.getElementById("question-p");
var qButtons = document.getElementsByName("q-btn");
var quizTimerP = document.getElementById("quiz-timer-p");

var myInterval;

/* looping through the resulting Quiz object array, reading each Object's data properties and values and printing them to the 
console (left for testing and reference purposes only)

for (var i = 0; i < quizCol.length; i++) {
    console.log("Quiz: " + i);
    for (var prop in quizCol[i]) {
        console.log(quizCol[i][prop]);
    }
}
*/

function startGame() {
    resetGame();
    getNextQuestion();
    myInterval = setInterval(displaySeconds, 1000);
}

// a function that loads the data (question, answers) of a Quiz object into the HTML page
function loadQuiz(quizObj) {
    
    questionP.innerHTML = quizObj.question;
    
    for (var i = 0; i < quizObj.possibleAnswers.length; i++) {
        qButtons[i].value = quizObj.possibleAnswers[i];
    }
}

// the function to utilize loadQuiz function, loading Quiz objects with each call until they are finished
function getNextQuestion() {
    if (currentQ == quizCol.length) {
        questionP.innerHTML = "Your score is: " + score + " points out of " + (quizCol.length * 10);
        clearInterval(myInterval);
        quizTimerP.style.visibility = "hidden";
        
        for (var i = 0; i < qButtons.length; i++) {
            qButtons[i].value = "";
            qButtons[i].style.visibility = "hidden";
        }
        return;
    }
    
    // if we haven't loaded the last Quiz object already, then load a new Quiz object
    loadQuiz(quizCol[currentQ]);
    
    // prepare the next Object for loading by increasing the index
    currentQ++;
    
    // reset the seconds counter, the time that has passed since the loading of the previous Quiz and getting the answer from the user
    elapsedSeconds = 1;
}

/* a function to get the value (text) of an HTML button if pressed, which I'm trating as the answer, and then 
checking the answer with the Quiz object for the answered question, since I'm also storing the right answer inside 
the Object itself
*/
function getBtnValue(buttonId) {
    var pressedBtn = document.getElementById(buttonId);
    var answerMoment = elapsedSeconds;
    var questionScore = 0;
    
    // currentQ was aleady increased when the corresponding object was loaded, so we need to use (CurrentQ - 1) to compare the answers
    if (pressedBtn.value == quizCol[currentQ - 1].rightAnswer) {
        
        // for accuracy, the specific moment (second) of the click on an answer button is (answerMoment - 1) and not answerMoment (interval issue)
        questionScore = calcQuestionScore(answerMoment - 1);
        score += questionScore;
    }
}

// a function to display the seconds counter, the time limit for answering each question
function displaySeconds() {
    quizTimerP.innerHTML = elapsedSeconds;
    elapsedSeconds++;
    
    // if the time ends and the user hasn't answered, the next Quiz object is loaded, the score of that question is 0, counter starts over
    if (elapsedSeconds > 20) {
        getNextQuestion();
        score += 0;
        elapsedSeconds = 1;
    }
}

// a function to calculate the variable score of each question based on a number (used as seconds passed)
function calcQuestionScore(num) {
    var score = 0;
    if (num <= 5) {
        score = 10;
    } else if (num <= 10) {
        score = 8;
    } else if (num <= 15) {
        score = 6;
    } else {
        score = 4;
    }
    return score;
}

// a function to be used when interrupting a current game and starting a new one before the first one is finished
function resetGame() {
    for (var i = 0; i < qButtons.length; i++) {
        qButtons[i].style.visibility = "visible";
    }
    clearInterval(myInterval);
    currentQ = 0;
    score = 0;
    quizTimerP.style.visibility = "visible";
}