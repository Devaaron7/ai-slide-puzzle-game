//import test from "node:test";
import * as script from "./script";
const shuffle = require("./script");
//const html = require("./")
test("Checks that the board was shuffled on load", () => {
  shuffleBoard();
  expect(winningPattern).toNotBe(tileBoard.children);
});
