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
  //add a message
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
const askQuestion = async () => {
  await logSubject(subjectStr);
  j = Math.floor(Math.random()*subjectLength);
  if (i < subjectLength - 1) {
    i++
    //array of the choices you can make from the json file
    const choicesJson = [
      subJson[randomArray[i]].answer,
      subJson[randomArray[i]].false1,
      subJson[randomArray[i]].false2,
      subJson[randomArray[i]].false3
    ]

    const shuffledArray = choicesJson.sort((a, b) => 0.5 - Math.random()); 

    //get index of correct answer from shuffled button choices 
    const correctAnswerIndex = shuffledArray.indexOf(subJson[randomArray[i]].answer);

    document.getElementById("score").innerHTML = `Score: ${score}`;

    //displays random question and possible answers
    let question = document.querySelector("#question");
    question.textContent = subJson[randomArray[i]].question;

    let buttonChoices = [
      document.querySelector('#quizButton1'),
      document.querySelector('#quizButton2'),
      document.querySelector('#quizButton3'),
      document.querySelector('#quizButton4')
    ]

    // randomly display buttons
    for(let k=0; k<buttonChoices.length; k++){
      buttonChoices[k].textContent = shuffledArray[k]
      buttonChoices[k].hidden = false;
      buttonChoices[k].addEventListener("click", () => {
        if (k == correctAnswerIndex){
          console.log('answered correctly')
          buttonChoices[k].removeEventListener("click", () =>{})
          correctAnswer();
        } else {
          wrongAnswer();
        }
      })
    }


  }
 
  else {
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

//Adjusting background image based on choice of game
const answerButtons = document.querySelectorAll('.answer-boxes a')



let backgroundImageURL;

if (subjectStr == "history") {
  backgroundImageURL = "./assets/parchment-paper-background-vrkkolsv6wuzovg0.jpg";
  
  answerButtons.forEach((anchor) => {
    anchor.style.backgroundColor = '#00008B'
    anchor.style.borderColor = '#00008B'
  });

} else if (subjectStr == "geography"){
  backgroundImageURL = "./assets/geographyBG.jpg"

  answerButtons.forEach((anchor) => {
    anchor.style.backgroundColor = '#DC143C'
    anchor.style.borderColor = '#DC143C'
  });
  
} else if (subjectStr == "art"){
  backgroundImageURL = "./assets/art.jpg"

  answerButtons.forEach((anchor) => {
    anchor.style.backgroundColor = '#4B0082'
    anchor.style.borderColor = '#4B0082'
  });
}

const backgroundChange = document.getElementById("answerContainer")
backgroundChange.style.backgroundImage = `url(${backgroundImageURL})`

 



module.exports = {
  logSubject,
  generateRandomArray
};