const { logSubject, generateRandomArray } = require("./historyquiz");

//test for logHistory
describe("logSubject", () => {

  it("exists", () => {
    expect(logSubject).toBeDefined();
  })
  it("is a function", () => {
    expect(logSubject instanceof Function).toEqual(true)
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
