//select number of questions
//does following n times:
//displays random question and possible answers
//user selects answer
//displays "correct" or "wrong" and updates score variable.
//displays result
//require API
const history = require(backend\history.json);

const numOfQuestions = 10; //change this when adding HTML
let score = 0;


//make something for selecting random questions


const displayQuestion = () => {
  //displays random question and possible answers
  //user selects answer
  //displays "correct" or "wrong" and updates score variable.

    const fetchQuestionData = async () =>{
    const question =  await fetch(`./history/random`)
  }
}

for (let i = 0; i < numOfQuestions; i++) { //calls displayQuestion numOfQuestion times
  displayQuestion();

}