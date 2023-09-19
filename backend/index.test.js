const {generateRandomIndex, app, history, getSubjectName, geography} = require("./index")
const request = require('supertest');


//test for generateRandomIndex function
describe("generateRandomIndex", () =>{

it ('exists', () =>{
    expect(generateRandomIndex).toBeDefined()
})

it ('is a function', ()=>{
    expect(generateRandomIndex instanceof Function).toEqual(true)
})

it ('returns a number when passed history', ()=>{
    expect(typeof generateRandomIndex(history) =='number').toEqual(true)
})

it ('returns a number when passed geography', ()=>{
  expect(typeof generateRandomIndex(geography) =='number').toEqual(true)
})

})

//test for getSubjectName function
describe("getSubjectName", () =>{

  it ('exists', () =>{
      expect(getSubjectName).toBeDefined()
  })
  
  it ('is a function', ()=>{
      expect(getSubjectName instanceof Function).toEqual(true)
  })

  it ('returns an object when passed "history"', ()=>{
    expect(typeof getSubjectName('history') =='object').toEqual(true)
  })

  it ('returns an object when passed "geography"', ()=>{
    expect(typeof getSubjectName('geography') =='object').toEqual(true)
  })

  it ('returns an undefined when passed an empty string', ()=>{
    expect(typeof getSubjectName('') =='undefined').toEqual(true)
  })

  
})



//test for GET /
describe('GET /', () => {
    it('responds with "Quiz APIs"', async () => {
      const response = await request(app).get('/'); // we are using await because this "supertest" package from npm basically simulates the get request so we have to pause the execution of the function until this request is completed.
      expect(response.status).toBe(200); // 200 is the default.
      expect(response.text).toBe('Quiz APIs');
    });
  });

//test for GET /history
describe('GET /history', () => {
    it('responds with all history.json file data', async () => {
      const response = await request(app).get('/history'); 
      expect(response.status).toBe(200); 

      const dataReceived = history
      expect(response.body).toEqual(dataReceived)
    });
  });

//test for GET /history/random
describe('GET /history/random', () => {
    it('responds with a random question from history.json. Checks by confirming expected and received is of same length', async () => {
      const response = await request(app).get('/history/random'); 
      expect(response.status).toBe(200);
  
      const randomQuestion = response.body; // What im getting
      const expectedRandomQuestion = history[generateRandomIndex(history)] //What im expecting to get [generateRandomIndex()]

      expect(randomQuestion.length).toEqual(expectedRandomQuestion.length) // so if the two match then we are good. Test is passed.
    });
  });

describe('GET /history/:id', () => {
    it('responds with the question of the index inputted from history.json', async () => {
      const response = await request(app).get('/history/random'); 
      expect(response.status).toBe(200);
  
      const randomQuestion = response.body; // What im getting
      const expectedRandomQuestion = history[generateRandomIndex()] //What im expecting to get

      expect(randomQuestion).toEqual(expectedRandomQuestion) // so if the two match then we are good. Test is passed.
    });
  });





