//select number of questions
//does following n times:
//displays random question and possible answers
//user selects answer
//displays "correct" or "wrong" and updates score variable.
//displays result
//require API
const history = require("../backend/history.json");

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


//displays question, checks answer etc.
const askQuestion = () => {
  //displays random question and possible answers
  let i = 0;
  const fetchQuestionData = async () => {
      const respData = await fetch(`http://localhost:3000/history/${randomArray[i]}`);
      console.log(await respData.json())
      

    //   console.log(fetchQuestionData())
  
  }
  fetchQuestionData()
  i++;
  //user selects answer
  //displays "correct" or "wrong" and updates score variable.
}
askQuestion();
// for (let i = 0; i < numOfQuestions; i++) { //calls displayQuestion numOfQuestion times
//   askQuestion();
// }




//example from fruit-salad:
// async function fetchFruitData(fruit) {
//   try {
//       //Make sure to replace this link with your deployed API URL in this fetch
//       const repsData = await fetch(`https://fruitapi-ipy8.onrender.com/fruits/${fruit}`);
//       const respImg = await fetch(
//           `https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`
//       );

//       if (repsData.ok && respImg.ok) {
//           const data = await repsData.json();
//           const imgData = await respImg.json();
//           addFruit(data, imgData);
//       } else {
//           throw "Something has gone wrong with one of the API requests";
//       }
//   } catch (e) {
//       console.log(e);
//   