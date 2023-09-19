const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const history = require("./history.json")
const geography = require("./Geography.json")

app.use(cors())
app.use(express.json());

const generateRandomIndex = () => Math.floor(Math.random() * history.length);

app.get("/", (req, res) => {
  res.send("History API")
})
//GET all
app.get("/history", (req, res) => {
  res.send(history)
})

//GET random question 
app.get("/history/random", (req, res) => {
  res.send(history[generateRandomIndex()])
  //displays random question from API
})

//GET question with index
app.get("/history/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < history.length) {
    res.status(200).send(history[req.params.id])
  } else {
    res.status(404).send(`Invalid index given. Enter number between 0 and ${history.length - 1}`)
  }
})

//POST new question
app.post("/history", (req, res) => {
  history.push(req.body)
  res.status(201).send(req.body)
})

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`)
  console.log(`${geography.length}`)
})