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
async function logSubject(subject) {
  const response = await fetch(`http://localhost:3000/${subject}`)
  subJson = await response.json()
  subjectLength = await subJson.length;
}
let score = 0
let randomArray = [];
const generateRandomArray = async () => {
  await logSubject(subjectStr)
  let arr = []
  for (let i = 0; i < subjectLength; i++) { //changed length thing here
    arr.push(i)
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  randomArray = arr;
}
generateRandomArray()
//eddited version
const correctAnswer = () => { //button of correct answer is clicked
  score++;
  question.textContent = `Correct! The answer is ${subJson[randomArray[i]].answer}`;
  document.getElementById("score").innerHTML = `Score: ${score}`;
  answerButton.remove()
  false1Button.remove()
  false2Button.remove()
  false3Button.remove()
  console.log("correct answer")
  setTimeout(askQuestion, 1500);
}
const wrongAnswer = () => {
  question.textContent = `Wrong! The correct answer is ${subJson[randomArray[i]].answer}. You got ${score} questions correct!`; //Add something e.g. `You put ${their answer}`
  answerButton.remove()
  false1Button.remove()
  false2Button.remove()
  false3Button.remove()
  console.log("Wrong answer")

  //add two buttons (with links for play again and home)
  let myDiv = document.getElementById("buttonDiv")
  let homeButton = document.createElement("a");
  homeButton.classList.add("btn", "btn-primary")
  let text2 = document.createTextNode("Home")
  homeButton.href = "http://127.0.0.1:5500/frontend/index.html";
  homeButton.appendChild(text2)
  myDiv.appendChild(homeButton)
  let restartButton = document.createElement("a");
  restartButton.classList.add("btn", "btn-primary")
  let text = document.createTextNode("Restart")
  restartButton.appendChild(text)
  myDiv.appendChild(restartButton)

  if (subjectStr == "history") {
    restartButton.style.backgroundColor = '#00008B'
    restartButton.style.borderColor = '#00008B'
    homeButton.style.backgroundColor = '#00008B'
    homeButton.style.borderColor = '#00008B'
  } else if (subjectStr == "geography") {
    restartButton.style.backgroundColor = '#DC143C'
    restartButton.style.borderColor = '#DC143C'
    homeButton.style.backgroundColor = '#DC143C'
    homeButton.style.borderColor = '#DC143C'
  } else if (subjectStr == "art") {
    restartButton.style.backgroundColor = '#4B0082'
    restartButton.style.borderColor = '#4B0082'
    homeButton.style.backgroundColor = '#4B0082'
    homeButton.style.borderColor = '#4B0082'
  }
  restartButton.addEventListener("click", () => { location.reload(true) })

}
const randomButtons = () => {
  let placeId = []
  let oneToFour = [1, 2, 3, 4]
  for (let i = 0; i = oneToFour.length; i++) {
    let j = Math.floor(Math.random() * (oneToFour.length - 1))
    let addNum = oneToFour.splice(j, 1)
    placeId.push(addNum[0])
  }
  return (placeId)
}
//displays question, checks answer etc.
let i = -1;
let j;
let question = undefined
let answerButton = undefined
let false1Button = undefined
let false2Button = undefined
let false3Button = undefined
let answerId = undefined
let falseId1 = undefined
let falseId2 = undefined
let falseId3 = undefined
let placeId = undefined
const askQuestion = async () => {
  await logSubject(subjectStr);
  j = Math.floor(Math.random() * subjectLength);
  if (i < subjectLength - 1) {
    placeId = randomButtons()
    answerId = placeId[0]
    falseId1 = placeId[1]
    falseId2 = placeId[2]
    falseId3 = placeId[3]
    i++
    question = undefined
    answer = undefined
    false1 = undefined
    false2 = undefined
    false3 = undefined
    //displays random question and possible answers
    document.getElementById("score").innerHTML = `Score: ${score}`;
    question = document.querySelector("#question");
    question.textContent = subJson[randomArray[i]].question;
    let buttonDiv = document.getElementById("buttonDiv")
    let buttonDiv2 = document.getElementById("buttonDiv2")
    answerButton = document.createElement("a")
    false1Button = document.createElement("a")
    false2Button = document.createElement("a")
    false3Button = document.createElement("a")
    let buttonArr = [answerButton, false1Button, false2Button, false3Button];
    buttonArr.forEach((el) => el.classList.add("btn", "btn-primary"))
    answerButton.style.backgroundColor = '#00008B';
    if (subjectStr == "history") {
      buttonArr.forEach((el) => {
        el.style.backgroundColor = '#00008B'
        el.style.borderColor = '#00008B'})
    } else if (subjectStr == "geography") {
      buttonArr.forEach((el) => {
        el.style.backgroundColor = '#DC143C'
        el.style.borderColor = '#DC143C'})
    } else if (subjectStr == "art") {
      buttonArr.forEach((el) => {
        el.style.backgroundColor = '#4B0082'
        el.style.borderColor = '#4B0082'})
    }
    
    // if (subjectStr == "history") {
    //   buttonArr.forEach((el) =>
    //   el.style.backgroundColor = '#00008B';
    //   el.style.borderColor = '#00008B')
    // } else if (subjectStr == "geography") {
  //     buttonArr.forEach((el)=> el.style.backgroundColor = '#DC143C'
  //     el.style.borderColor = '#DC143C')
  //  } else if (subjectStr == "art") {
  //     buttonArr.forEach((el)=> el.style.backgroundColor = '#4B0082'
  //     el.style.borderColor = '#4B0082')
  //   }
    let answerText = document.createTextNode(subJson[randomArray[i]].answer)
    let false1Text = document.createTextNode(subJson[randomArray[i]].false1)
    let false2Text = document.createTextNode(subJson[randomArray[i]].false2)
    let false3Text = document.createTextNode(subJson[randomArray[i]].false3)
    if (answerId == 1 || answerId == 2) {
      buttonDiv.appendChild(answerButton)
    } else if (answerId == 3 || answerId == 4) {
      buttonDiv2.appendChild(answerButton)
    }
    if (falseId1 == 1 || falseId1 == 2) {
      buttonDiv.appendChild(false1Button)
    } else if (falseId1 == 3 || falseId1 == 4) {
      buttonDiv2.appendChild(false1Button)
    }
    if (falseId2 == 1 || falseId2 == 2) {
      buttonDiv.appendChild(false2Button)
    } else if (falseId2 == 3 || falseId2 == 4) {
      buttonDiv2.appendChild(false2Button)
    }
    if (falseId3 == 1 || falseId3 == 2) {
      buttonDiv.appendChild(false3Button)
    } else if (falseId3 == 3 || falseId3 == 4) {
      buttonDiv2.appendChild(false3Button)
    }
    let randNum = Math.random();
    if (randNum > 0.5) {
      buttonDiv.classList.add("d-flex", "flex-row-reverse")
      buttonDiv2.classList.add("d-flex", "flex-row-reverse")
    } else if (randNum <= 0.5) {
      buttonDiv.classList.remove("flex-row-reverse")
      buttonDiv2.classList.remove("flex-row-reverse")
    }
    answerButton.appendChild(answerText)
    false1Button.appendChild(false1Text)
    false2Button.appendChild(false2Text)
    false3Button.appendChild(false3Text)
    answerButton.addEventListener("click", correctAnswer)
    false1Button.addEventListener("click", wrongAnswer)
    false2Button.addEventListener("click", wrongAnswer)
    false3Button.addEventListener("click", wrongAnswer)
  } else {
    //finished answering questions
    question = document.querySelector("#question");
    question.textContent = `Congratulations! You got all questions correct. Your score is ${score}.`;
    answerButton.remove()
    false1Button.remove()
    false2Button.remove()
    false3Button.remove()

    //add two buttons (with links for play again and home)
    let myDiv = document.getElementById("buttonDiv")
    let homeButton = document.createElement("a");
    homeButton.classList.add("btn", "btn-primary")
    let text2 = document.createTextNode("Home")
    homeButton.href = "http://127.0.0.1:5500/frontend/index.html";
    homeButton.appendChild(text2)
    myDiv.appendChild(homeButton)
    let restartButton = document.createElement("a");
    restartButton.classList.add("btn", "btn-primary")
    let text = document.createTextNode("Restart")
    restartButton.appendChild(text)
    myDiv.appendChild(restartButton)

    if (subjectStr == "history") {
      restartButton.style.backgroundColor = '#00008B'
      restartButton.style.borderColor = '#00008B'
      homeButton.style.backgroundColor = '#00008B'
      homeButton.style.borderColor = '#00008B'
    } else if (subjectStr == "geography") {
      restartButton.style.backgroundColor = '#DC143C'
      restartButton.style.borderColor = '#DC143C'
      homeButton.style.backgroundColor = '#DC143C'
      homeButton.style.borderColor = '#DC143C'
    } else if (subjectStr == "art") {
      restartButton.style.backgroundColor = '#4B0082'
      restartButton.style.borderColor = '#4B0082'
      homeButton.style.backgroundColor = '#4B0082'
      homeButton.style.borderColor = '#4B0082'
    }
    restartButton.addEventListener("click", () => { location.reload(true) })
  }
}
askQuestion();
//Adding a timer:
const startingMinutes = 20;
time = startingMinutes * 60;
const countdownEl = document.getElementById('countdown')
const updateCountdown = () => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
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
} else if (subjectStr == "geography") {
  backgroundImageURL = "./assets/geographyBG.jpg"
  answerButtons.forEach((anchor) => {
    anchor.style.backgroundColor = '#DC143C'
    anchor.style.borderColor = '#DC143C'
  });
} else if (subjectStr == "art") {
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