/**
 * @jest-environment jsdom
 */

const shuffleBoard = require("./script");

//const sum = require("./script");
// var tileBoard = document.getElementById("board");
// var winningPattern = [...tileBoard.children];

//const { shuffleBoard } = require("./script");

//const { tileBoard } = require("./script");

// test("Checks that the board was shuffled on load", () => {
//   shuffleBoard();
//   expect(winningPattern).toNotBe(tileBoard.children);
// });

test("Checks that the board was shuffled on load", () => {
  var tileBoard = document.getElementById("board");
  //console.log(tileBoard);
  var correctOrder = [...tileBoard];
  //shuffleBoard();
  var randomOrder = [...tileBoard.children];
  expect(correctOrder == randomOrder).toBe(false);
});
