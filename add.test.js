/**
 * @jest-environment jsdom
 */

//import test from "node:test";
//import * as myModule from "./add.js";
//const shuffle = require("./script");
//const html = require("./")

const add = require("./add");
// test("Checks that the board was shuffled on load", () => {
//   shuffleBoard();
//   expect(winningPattern).toNotBe(tileBoard.children);
// });

test("subtract 2 - 1 to equal 1", () => {
  expect(add(2, 1)).toBe(3);
});
