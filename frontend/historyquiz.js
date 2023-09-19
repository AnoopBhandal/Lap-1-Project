//select number of questions
//does following n times:
//displays random question and possible answers
//user selects answer
//displays "correct" or "wrong" and updates score variable.
//displays result


//NEED TO: require API
let history; //need to add async and "await logHistory()" to functions using history
let historyLength;
<<<<<<< HEAD
let numOfQuestions;
=======
>>>>>>> main
async function logHistory() {
  const response = await fetch("http://localhost:3000/history");
  history = await response.json();
  historyLength = await history.length
<<<<<<< HEAD
  numOfQuestions = await historyLength
}


//change this when adding HTML
let score = 0

//generates an array of random indexes (for history.json) (without repetition)
const generateRandomArray = async n => {
  await logHistory()
  let arr = []
  if (n <= historyLength) {
    for (let i = 0; i < n; i++) {
      let a = Math.floor(Math.random() * historyLength)
      if (arr.includes(a)) {
=======
}


const numOfQuestions = 5; //change this when adding HTML
let score = 0

//generates an array of random indexes (for history.json) (without repetition)

let randomArray = [];

const generateRandomArray = async n => { //make sure nothings asked twice
  await logHistory()
  if (n <= historyLength) {
    for (let i = 0; i < n; i++) {
      let a = Math.floor(Math.random() * historyLength)
      if (randomArray.includes(a)) {
>>>>>>> main
        i -= 1
      } else {
        randomArray.push(a)
      }
    }
    return randomArray
  } else {
    return
  }
}
generateRandomArray(numOfQuestions);

//edit these functions to fit HTML
const correctAnswer = () => { //button of correct answer is clicked
  score++;
  //add a message?
  question.textContent = `Correct! The answer is ${history[randomArray[i]].answer}`;
  document.getElementById("score").innerHTML = `Score: ${score}`;
  let answer = document.querySelector("#quizButton1");
  answer.hidden = true
  let false1 = document.querySelector("#quizButton2");
  false1.hidden = true
  let false2 = document.querySelector("#quizButton3");
  false2.hidden = true
  let false3 = document.querySelector("#quizButton4");
  false3.hidden = true
  setTimeout(askQuestion, 2000);
}
const wrongAnswer = () => {
  question.textContent = `Wrong! The correct answer is ${history[randomArray[i]].answer}. You got ${score} questions correct!`; //Add something e.g. `You put ${their answer}`
  let answer = document.querySelector("#quizButton1");
  answer.remove()
  let false1 = document.querySelector("#quizButton2");
  false1.remove()
  let false2 = document.querySelector("#quizButton3");
  false2.remove()
  let false3 = document.querySelector("#quizButton4");
  false3.remove()
  //add two buttons (with links for play again and home)
  let myDiv = document.getElementById("buttonDiv")
    let restartButton = document.createElement("button")
    let text = document.createTextNode("Restart")
    restartButton.appendChild(text)
    myDiv.appendChild(restartButton)
    restartButton.style.backgroundColor = "blue"
    restartButton.addEventListener("click", ()=> {location.reload(true)})
    
}


//displays question, checks answer etc.
let i = -1
const askQuestion = async () => {
  await logHistory();
  if (i < numOfQuestions - 1) {
    i++
    //displays random question and possible answers
    document.getElementById("score").innerHTML = `Score: ${score}`;
    let question = document.querySelector("#question");
    question.textContent = history[randomArray[i]].question;
    let answer = document.querySelector("#quizButton1");
    answer.textContent = history[randomArray[i]].answer;
    answer.hidden = false
    let false1 = document.querySelector("#quizButton2");
    false1.textContent = history[randomArray[i]].false1;
    false1.hidden = false
    let false2 = document.querySelector("#quizButton3");
    false2.textContent = history[randomArray[i]].false2;
    false2.hidden = false
    let false3 = document.querySelector("#quizButton4");
    false3.textContent = history[randomArray[i]].false3;
    false3.hidden = false
    //user selects answer displays "correct" or "wrong" and updates score variable.
    answer.addEventListener("click", correctAnswer)
    false1.addEventListener("click", wrongAnswer)
    false2.addEventListener("click", wrongAnswer)
    false3.addEventListener("click", wrongAnswer)
  } else {
    //finished answering questions
    let question = document.querySelector("#question");
    question.textContent = `Congratulations! You got all questions correct. Your score is ${score}.`;
    let answer = document.querySelector("#quizButton1");
    answer.remove()
    let false1 = document.querySelector("#quizButton2");
    false1.remove()
    let false2 = document.querySelector("#quizButton3");
    false2.remove()
    let false3 = document.querySelector("#quizButton4");
    false3.remove()

    //add two buttons (with links for play again and home)
    let myDiv = document.getElementById("buttonDiv")
    let restartButton = document.createElement("button")
    let text = document.createTextNode("Restart")
    restartButton.appendChild(text)
    myDiv.appendChild(restartButton)
    restartButton.style.backgroundColor = "blue";
    restartButton.addEventListener("click", ()=> {location.reload(true)})
    
  }
}
askQuestion();

