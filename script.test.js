/**
 * @jest-environment jsdom
 */

//const sum = require("./script");
var tileBoard = document.getElementById("board");
var winningPattern = [...tileBoard.children];

test("Checks that the board was shuffled on load", () => {
  shuffleBoard();
  expect(winningPattern).toNotBe(tileBoard.children);
});

// test("Checks that the board was shuffled on load", () => {
//   expect(add(1, 2)).toBe(3);
// });
