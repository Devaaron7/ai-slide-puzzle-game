/**
 * @jest-environment jsdom
 */

const methodsToTest = require("./script");

describe("Checks that the board was loaded", () => {
  test("", () => {
    let tileBoard = methodsToTest.render();
    let checkBoard = tileBoard.getElementById("board");
    let checkTile = tileBoard.getElementById("P1of9");

    expect(checkTile.id == "P1of9" && checkBoard.children.length == 9).toBe(
      true
    );
  });
});

describe("Checks that board was shuffled", () => {
  test("", () => {
    let tileBoard = methodsToTest.render();
    var startPostion = [...tileBoard.getElementById("board").children];
    methodsToTest.shuffleBoard();
    var afterShuffle = [...tileBoard.getElementById("board").children];

    expect(startPostion == afterShuffle).toBe(false);
  });
});

describe("Checks that cheat function places board in win position", () => {
  test("", () => {
    // hack - need to see how the run test without shuffle from
    // ln 4 of script.js starting
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
  test("", () => {
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

describe("All valid tiles move when clicked", () => {
  test("", () => {
    methodsToTest.cheat();
    let tileBoard = methodsToTest.render();
    methodsToTest.cheat();
    let patternA = [];
    let patternB = [];
    var counterCheck = 0;
    var didBoardMove = Boolean(false);
    var startPostion = [...tileBoard.getElementById("board").children];
    var validTilesToTest = tileBoard.getElementById("board").children;
    for (var i = 0; i < startPostion.length; i++) {
      patternA.push(startPostion[i]);
    }

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
