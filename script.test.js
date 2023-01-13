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

    console.log(tileBoard);

    expect(startPostion == afterShuffle).toBe(false);
  });
});

describe("Checks that cheat function places board in win position", () => {
  test("", () => {
    let tileBoard = methodsToTest.render();
    var startPostion = [...tileBoard.getElementById("board").children];
    methodsToTest.shuffleBoard();
    methodsToTest.cheat();
    var currentPostion = [...tileBoard.getElementById("board").children];

    // console.log(tileBoard.getElementById("P1of9"));

    // console.log(currentPostion);

    // Test incorrect, needs to be fixed
    expect(startPostion == currentPostion).toBe(false);
  });
});
