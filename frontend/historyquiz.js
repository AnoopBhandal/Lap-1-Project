//select number of questions
//does following n times:
//displays random question and possible answers
//user selects answer
//displays "correct" or "wrong" and updates score variable.
//displays result


//NEED TO: require API
let history; //need to add async and "await logHistory()" to functions using history
let historyLength;
let numOfQuestions;
async function logHistory() {
  const response = await fetch("http://localhost:3000/history");
  history = await response.json();
  historyLength = await history.length
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
        i -= 1
      } else {
        arr.push(a)
      }
    }
    return arr
  } else {
    return 
  }
}
let randomArray = generateRandomArray(numOfQuestions);

//edit these functions to fit HTML
const correctAnswer = () => { //button of correct answer is clicked
  score++;
  //add a message?
  question.textContent = `Correct! The answer is ${history[i].answer}`;
  document.getElementById("score").innerHTML = `Score: ${score}`;
  setTimeout(askQuestion,2500);
}
const wrongAnswer = () => {
  question.textContent = `Wrong! The correct answer is ${history[i].answer}.`; //Add something e.g. `You put ${their answer}`
  setTimeout(askQuestion,2500);
}

//displays question, checks answer etc.
let i=-1
const askQuestion = async () => {
  await logHistory();
  console.log(randomArray)
  if (i<numOfQuestions-1) {
  i++
  //displays random question and possible answers
  document.getElementById("score").innerHTML = `Score: ${score}`;
  let question = document.querySelector("#question");
  question.textContent = history[i].question;
  let answer = document.querySelector("#quizButton1");
  answer.textContent = history[i].answer;
  let false1 = document.querySelector("#quizButton2");
  false1.textContent = history[i].false1;
  let false2 = document.querySelector("#quizButton3");
  false2.textContent = history[i].false2;
  let false3 = document.querySelector("#quizButton4");
  false3.textContent = history[i].false3;
  //user selects answer displays "correct" or "wrong" and updates score variable.
  answer.addEventListener("click", correctAnswer)
  false1.addEventListener("click", wrongAnswer)
  false2.addEventListener("click", wrongAnswer)
  false3.addEventListener("click", wrongAnswer)
  } else {
    //finished answering questions
    //
    let question = document.querySelector("#question");
    question.textContent = "finished questions";
    let answer = document.querySelector("#quizButton1");
    answer.remove()
    false1.remove()
    false2.remove()
    false3.remove()
  }
}
askQuestion();
