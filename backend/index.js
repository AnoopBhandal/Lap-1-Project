const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const history = require("./history.json")
const geography = require("./geography.json")

const subjArr = ["history","geography"]

app.use(cors())
app.use(express.json());

const generateRandomIndex = (subj) => Math.floor(Math.random() * subj.length);

const getSubjectName = (str) => {
  let subject = undefined
  if (str =='history'){
    subject = history
    return subject
  } else if (str =='geography'){
    subject = geography
    return subject
  } else {
    return subject
  }
}


app.get("/", (req, res) =>{
    res.send("Quiz APIs")
})

//GET all
app.get("/:subject", (req, res) => {
  const subject = getSubjectName(req.params.subject)
  if (subjArr.includes(req.params.subject)){
    res.send(subject)
  } else {
    res.status(404).send(`Invalid subject selected`)}
})

//GET random question 
app.get("/:subject/random", (req, res) => {
  const subject = getSubjectName(req.params.subject)

  if (subjArr.includes(req.params.subject)){
    res.send(subject[generateRandomIndex(subject)])
  } else {
    res.status(404).send(`Invalid subject selected`)}
})
  


//GET question with index
app.get("/:subject/:id", (req, res) => {
  const subject = getSubjectName(req.params.subject)
  if (req.params.id >= 0 && req.params.id < subject.length) {
    res.status(200).send(subject[req.params.id])
  }else {
    res.status(404).send(`Invalid index given. Enter number between 0 and ${subject.length - 1}`)
  }
})

//POST new question
app.post("/:subject", (req, res) => {
  const subject = getSubjectName(req.params.subject)
  subject.push(req.body)
  res.status(201).send(req.body)
})


app.listen(port, ()=>{
    console.log(`Server is now listening on port ${port}`)
})


//exporting function for testing purpose

module.exports={
  generateRandomIndex,
  app,
  history,
  getSubjectName,
  geography,
  subjArr
}

