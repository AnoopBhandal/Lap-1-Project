
# Lap-1-Project: Educational Quiz Game
An educational multiple choice game, aimed at secondary school, non-STEM students, created using JavaScript, HTML and CSS. In the game, users aim to answer questions correctly. If the answer a question wrong, the game ends. If they answer all questions correctly, they win.

## Installation & Usage
### Installation
- Clone the repo.
- Open the terminal.
- Call `npm install express` to install express.
- Call `npm install cors` to install cors.
- Call `npm install nodemon -D` to install nodemon.
- Call `npm install jest -D` to install jest and `npm install supertest -D` to install supertest. These are used to test the code.

### Usage
- Open the terminal.
- Navigate to `Lap-1-Project/backend`.
- Call `npm run dev` on the command line.
- Open another terminal window.
- Navigate to `Lap-1-Project/frontend`.
- Navigate to `index.html`.
- Open `index.html` in the browser.
- Once opened in the browser, you can navigate to quizzes for three different subjects.

## Technologies
- JavaScript
- HTML
- CSS
- Bootstrap
- Nodemon
- Express
- Cors
- Jest
- Supertest

## Process
- We began by creating the HTML pages.
- We then created backend/index.js, which runs the server and requires the question data from the relevant json files.
- We then wrote the JavaScript code that imports this data into the quizzes for each subject.
- This was then adapted so that the same file can be used for each subject.
- The JavaScript code was adapted again so that the placement of the correct answer would be randomised.
- We then worked on making the quiz page responsive.

## Wins & Challenges
### Wins
- After answering a question, the quiz tells you if your answer was correct or wrong, and then moves onto the next question if correct.
- The questions are asked in a random order with no repetitions.
- One JavaScript file can be used to run all three quizzes.
### Challenges
- Getting the correct answer button to appear in a random position (rather than always appearing in the same position) was challenging, but we got it to work.
- Writing tests for the frontend was challenging, as the functions fetch data from APIs. We didn't manage to get these tests to work.

## Screenshots
![Screenshot of the home page.](/frontend/assets/homePageScreenshot.png)
![Screenshot of the history quiz page.](/frontend/assets/quizPageScreenshot.png)
The above screenshots are of the home page and the history quiz page.
## Future Features
- In the future, we would add a second type of quiz. This would be a speed quiz where the user aims to answer as many questions as possible in a given time.
- It would be quite easy to add new subjects. This would be done by adding new json files and adding a few lines of code to the frontend JavaScript file 
- We would also add to the timer. We could define a function similar to `correctAnswer` and `wrongAnswer` which is called when the timer runs out and displays a message telling the user the timer has run out. Alternatively, we could adapt the timer so that it count up, allowing the user to time how fast they can complete the quiz. The final completion time could be shown along with the user's final score.
- We might have considered creating a user input option asking for a user’s name and creating a leaderboard.
- While the quiz game test does adapt to the size of the user's screen, it may be too small when used on a phone.

## Code Snippets
```
const searchParams = new URLSearchParams(window.location.search);
const subjectStr = (searchParams.get('subject'));
let subjectLength;
let subJson;
async function logSubject(subject) {
  const response = await fetch(`http://localhost:3000/${subject}`)
  subJson = await response.json()
  subjectLength = await subJson.length;
}
```
The above snippet of code fetches data from APIs. This contains the questions and answers for each subject. By using template literals, every subject quiz is able to use the same JavaScript file.

```
let randomArray = [];
const generateRandomArray = async () => {
  await logSubject(subjectStr)
  let arr = []
  for (let i = 0; i < subjectLength; i++) {
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
```
This snippet first defines `randomArray` as an empty array, then calls a function, `generateRandomArray`, which reassigns `randomArray` to a shuffled array of all the number from `0` to `subjectLength - 1`. This is used to give the order that the questions will be asked.

## Bugs
- When using a smaller screen, the burger doesn't work (only on quiz pages)