//select number of questions
//does following n times:
//displays random question and possible answers
//user selects answer
//displays "correct" or "wrong" and updates score variable.
//displays result


//NEED TO: require API

const searchParams = new URLSearchParams(window.location.search);
const subjectStr = (searchParams.get('subject')); 
let subjectLength;
let subJson;


async function logSubject(subject){
  const response = await fetch (`http://localhost:3000/${subject}`)
  subJson = await response.json()
  subjectLength = await subJson.length;
}


let score = 0

//generates an array of random indexes (for history.json) (without repetition)

let randomArray = [];
const generateRandomArray = async () =>{
  await logSubject(subjectStr)
  let arr = [] 
  for (let i=0; i<subjectLength; i++){ //changed length thing here
    arr.push(i)
  }
  for (let i =arr.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  randomArray = arr;
}
generateRandomArray()

const correctAnswer = () => { //button of correct answer is clicked
  score++;
  //add a message?
  question.textContent = `Correct! The answer is ${subJson[randomArray[i]].answer}`;
  document.getElementById("score").innerHTML = `Score: ${score}`;
  let answer = document.querySelector("#quizButton1");
  answer.hidden = true
  let false1 = document.querySelector("#quizButton2");
  false1.hidden = true
  let false2 = document.querySelector("#quizButton3");
  false2.hidden = true
  let false3 = document.querySelector("#quizButton4");
  false3.hidden = true
  setTimeout(askQuestion, 1500);
}
const wrongAnswer = () => {
  question.textContent = `Wrong! The correct answer is ${subJson[randomArray[i]].answer}. You got ${score} questions correct!`; //Add something e.g. `You put ${their answer}`
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
let i = -1;
let j;
const askQuestion = async () => {
  await logSubject(subjectStr);
  j = Math.floor(Math.random()*subjectLength);
  if (i < subjectLength - 1) {
    i++
    //displays random question and possible answers
    document.getElementById("score").innerHTML = `Score: ${score}`;
    let question = document.querySelector("#question");
    question.textContent = subJson[randomArray[i]].question;
    let answer = document.querySelector("#quizButton1");
    answer.textContent = subJson[randomArray[i]].answer;
    answer.hidden = false
    let false1 = document.querySelector("#quizButton2");
    false1.textContent = subJson[randomArray[i]].false1;
    false1.hidden = false
    let false2 = document.querySelector("#quizButton3");
    false2.textContent = subJson[randomArray[i]].false2;
    false2.hidden = false
    let false3 = document.querySelector("#quizButton4");
    false3.textContent = subJson[randomArray[i]].false3;
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


//Adding a timer:

const startingMinutes = 20;
time = startingMinutes*60;

const countdownEl = document.getElementById('countdown') 

const updateCountdown = () => {
  const minutes = Math.floor(time/60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds:seconds;

  countdownEl.innerHTML = `Timer: ${minutes}:${seconds}`
  document.getElementById('countdown').style.font = "bold 30px arial,serif";

  time--;
}

setInterval(updateCountdown, 1000);

module.exports = {
  logSubject,
  generateRandomArray
}
