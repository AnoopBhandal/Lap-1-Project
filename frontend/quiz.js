//select number of questions
//does following n times:
//displays random question and possible answers
//user selects answer
//displays "correct" or "wrong" and updates score variable.
//displays result


//NEED TO: require API





// const history = import (await response(("../backend/history.json").json()))

// import * as data from "../backend/history.json";
// const history = data


const numOfQuestions = 2; //change this when adding HTML
let score = 0;

const generateRandomArray = n => { //generates an array of random indexes (for history.json) (without repetition)
  let arr = []
  if (n <= history.length) {
    for (let i = 0; i < n; i++) {
      let a = Math.floor(Math.random() * history.length)
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


//make something for selecting random questions
//when displayQuestion is called, a random index in the range is generated and pushed into an array (indexRecord). when displayQuestion is called again, if the random index is generates is in indexRecord, it generates another index.

const correctAnswer = () => { //button of correct answer is clicked
  score++;
  //add a message?
  let ms = document.querySelector("#message");
  // ms.textContent = `Correct! The answer is ${history.answer}`;
  ms.textContent = history;

}
const wrongAnswer = () => {
  let ms = document.querySelector("#message");
  ms.textContent = `Wrong! The correct answer is ${history.answer}.` //Add something e.g. `You put ${their answer}`
}
correctAnswer()
//displays question, checks answer etc.
let i = 0;
const askQuestion = () => {
  //displays random question and possible answers
  const fetchQuestionData = async () => {
    const respData = await fetch(`http://localhost:3000/history/${randomArray[i]}`);
    const question = (await respData.json())
    return question
  }
  fetchQuestionData()
  i++;
  //user selects answer

  //displays "correct" or "wrong" and updates score variable.
}
for (let i = 0; i < numOfQuestions; i++) { //calls displayQuestion numOfQuestion times
  askQuestion();
  
}

async function submitAnswer(){
  const respData = await fetch(`http://localhost:3000/history/${randomArray[0]}`); 
  const question = await (respData.json())
  let questionAsked = document.createElement("p")
  questionAsked.innerHTML = question[question]
  document.body.appendChild(questionAsked)
  let option1 = document.createElement("button")
  option1.innerHTML = question[answer]
  document.body.appendChild(option1)
  let option2 = document.createElement("button")
  option1.innerHTML = question[false1]
  document.body.appendChild(option2)
  let option3 = document.createElement("button")
  option1.innerHTML = question[false2]
  document.body.appendChild(option3)
  let option4 = document.createElement("button")
  option1.innerHTML = question[false3]
  document.body.appendChild(option4)
}

submitAnswer();
