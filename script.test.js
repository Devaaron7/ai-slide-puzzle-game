/** @jest-environment jsdom */

const methodsToTest = require("./script");
const puppeteer = require("puppeteer");

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

// Setup
beforeEach(async () => {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let page = await browser.newPage();

  await page.goto("http://127.0.0.1:5500/index_test.html");
});

// Tear Down
afterEach(async () => {
  await browser.close();
});

// Tests
describe("Checks that the board was loaded", () => {
  test("", async () => {
    //const url = await page.url();
    //methodsToTest.render();
    methodsToTest.render();
    let tileBoard = methodsToTest.render();
    tileBoard;
    let checkBoard = tileBoard.getElementById("board");
    let checkTile = tileBoard.getElementById("P1of9");
    await sleep(15);
    await expect(
      checkTile.id == "P1of9" && checkBoard.children.length == 9
    ).toBe(true);
  });
});

describe("Checks that board was shuffled", () => {
  test("", async () => {
    const url = await page.url();
    let tileBoard = methodsToTest.render();
    var startPostion = [...tileBoard.getElementById("board").children];
    methodsToTest.shuffleBoard();
    var afterShuffle = [...tileBoard.getElementById("board").children];

    expect(startPostion == afterShuffle).toBe(false);
  });
});

describe("Checks that cheat function places board in win position", () => {
  test("", async () => {
    // hack - need to see how the run test without shuffle from
    // ln 4 of script.js starting
    const url = await page.url();
    methodsToTest.cheat();
    let tileBoard = methodsToTest.render();
    let patternA = [];
    let patternB = [];
    var counterCheck = 0;
    var isBoardDone = Boolean(false);
    var startPostion = [...tileBoard.getElementById("board").children];
    for (var i = 0; i < startPostion.length; i++) {
      patternA.push(startPostion[i]);
    }

    methodsToTest.shuffleBoard();

    methodsToTest.cheat();
    var currentPostion = [...tileBoard.getElementById("board").children];
    for (var i = 0; i < currentPostion.length; i++) {
      patternB.push(currentPostion[i]);
    }

    for (var i = 0; i < 8; i++) {
      if (patternA[i] == patternB[i]) {
        counterCheck += 1;
        if (counterCheck == 8) {
          isBoardDone = true;
        }
      }
    }

    expect(isBoardDone).toBe(true);
  });
});

// test may not be accurate
describe("No invalid tiles move when clicked", () => {
  test("", async () => {
    const url = await page.url();
    methodsToTest.cheat();
    let tileBoard = methodsToTest.render();
    methodsToTest.cheat();
    let patternA = [];
    let patternB = [];
    var counterCheck = 0;
    var didBoardMove = Boolean(false);
    var startPostion = [...tileBoard.getElementById("board").children];
    var invalidTilesToTest = tileBoard.getElementById("board").children;
    for (var i = 0; i < startPostion.length; i++) {
      patternA.push(startPostion[i]);
    }

    var tilesToClick = [
      invalidTilesToTest[0],
      invalidTilesToTest[1],
      invalidTilesToTest[2],
      invalidTilesToTest[3],
      invalidTilesToTest[4],
      invalidTilesToTest[6],
    ];

    for (var i = 0; i < tilesToClick.length; i++) {
      tilesToClick[i].click;
    }
    sleep(20);
    //debugger;

    var currentPostion = [...tileBoard.getElementById("board").children];
    for (var i = 0; i < currentPostion.length; i++) {
      patternB.push(currentPostion[i]);
    }

    for (var i = 0; i < 8; i++) {
      if (patternA[i] == patternB[i]) {
        counterCheck += 1;
        if (counterCheck == 8) {
          didBoardMove = false;
        }
      }
    }

    expect(didBoardMove).toBe(false);
  });
});

jest.setTimeout(10000);
describe("All valid tiles move when clicked", () => {
  test("", async () => {
    const url = await page.url();
    //methodsToTest.cheat;
    //sleep(3);
    let tileBoard = methodsToTest.render();
    //debugger;
    methodsToTest.cheat();
    //debugger;
    //sleep(3);
    let patternA = [];
    let patternB = [];
    var counterCheck = 0;
    var didBoardMove = Boolean(false);
    var startPostion = [...tileBoard.getElementById("board").children];
    var validTilesToTest = tileBoard.getElementById("board").children;
    for (var i = 0; i < startPostion.length; i++) {
      patternA.push(startPostion[i]);
    }

    await sleep(5);

    var tilesToClick = [
      validTilesToTest[5],
      validTilesToTest[8],
      validTilesToTest[7],
      validTilesToTest[8],
      validTilesToTest[5],
      validTilesToTest[4],
      validTilesToTest[1],
      validTilesToTest[0],
    ];

    await sleep(5);

    for (var i = 0; i < tilesToClick.length; i++) {
      tilesToClick[i].click;
    }

    var currentPostion = [...tileBoard.getElementById("board").children];
    for (var i = 0; i < currentPostion.length; i++) {
      patternB.push(currentPostion[i]);
    }

    for (var i = 0; i < 8; i++) {
      if (patternA[i] == patternB[i]) {
        counterCheck += 1;
        if (counterCheck == 8) {
          didBoardMove = false;
        } else {
          didBoardMove = true;
        }
      }
    }
    debugger;
    expect(didBoardMove).toBe(true);
  });
});
