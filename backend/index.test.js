const {generateRandomIndex, app, history, getSubjectName, geography, subjArr} = require("./index")
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

  
//test for GET /subject 
describe('GET /:subject', () => {
  for (let i = 0; i < subjArr.length; i++){
    it(`responds with all ${subjArr[i]}.json file data`, async () => {
      const response = await request(app).get(`/${subjArr[i]}`); 
      expect(response.status).toBe(200); 
  
      const resultReceived = response.body
      const expectedResult = getSubjectName(subjArr[i])
      expect(resultReceived).toEqual(expectedResult)
    });
  }
});



//test for GET /:subject/random
describe('GET /:subject/random', () => {
  for (let i = 0; i < subjArr.length; i++) {
    it(`responds with a random question from ${subjArr[i]}.json.`, async () => {
      const response = await request(app).get(`/${subjArr[i]}/random`); 
      expect(response.status).toBe(200);

      const subject = getSubjectName(subjArr[i])
      const randomQuestion = response.body; // What im getting
      const expectedRandomQuestion = subject[generateRandomIndex(subject)] //What im expecting to get [generateRandomIndex()]

      expect(randomQuestion.length).toEqual(expectedRandomQuestion.length) // so if the two match in length then we are good. Test is passed.
    });
  }
});




describe('GET /:subject/:userInputIndex', () => {
  for(let i = 0; i < subjArr.length; i++){
    let subject= getSubjectName(subjArr[i])
    for (let j=0; j < subject.length; j++){
      it(`responds with the question index ${j} from subject ${subjArr[i]} when :userInputIndex = ${j}`, async () => {
        const response = await request(app).get(`/${subjArr[i]}/${j}`); 
        expect(response.status).toBe(200);
    
        const resultReceived = response.body; // What im getting
        const expectedResult = subject[j] //What im expecting to get
  
        expect(resultReceived).toEqual(expectedResult) // so if the two match then we are good. Test is passed.
      });
      
    }
  }
});







