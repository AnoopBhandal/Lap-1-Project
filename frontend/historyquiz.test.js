const { logHistory, generateRandomArray } = require("./historyquiz");

const practiseFunction = () => {
  newVariable = 5;
}

//practise test
describe("practiseFunction", () => {
  beforeEach(() => {
    let newVariable = 42; // Initialize the variable before each test
  });
  it("reassigns newVariable", () => {
    practiseFunction();
    expect(newVariable).toEqual(5);
  })
})
global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve({ key: 'value' }), // Mock response data (for fetching API)
  })
})
let history;
//test for logHistory
describe("logHistory", () => {

  it("exists", () => {
    expect(logHistory).toBeDefined();
  })
  it("is a function", () => {
    expect(logHistory instanceof Function).toEqual(true)
  })
  it("fetches data from API", async () => {
    await logHistory();
    expect(history).toEqual({ key: 'value' })
  })
})

//test for generateRandomArray function
describe("generateRandomArray", () => {
  it("exists", () => {
    expect(generateRandomArray).toBeDefined();
  })
  it("is a function", () => {
    expect(generateRandomArray instanceof Function).toEqual(true);
  })
  it("generateRandomArray defines randomArray", async () => { //this doesn't work
    await logHistory();
    let randomArray;
    await generateRandomArray();
    randomArray = window.randomArray;
    expect(randomArray).toBeDefined();
  })
})
