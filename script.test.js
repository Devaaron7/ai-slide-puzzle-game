/**
 * @jest-environment jsdom
 */

function render() {
  const rootDiv = document.createElement("div");
  rootDiv.setAttribute("id", "board");
  rootDiv.setAttribute("class", "main-board");

  var counter = 0;
  for (i = 0; i < 9; i++) {
    var childDiv = document.createElement("div");
    childDiv.setAttribute("id", `P${counter}of9`);
    rootDiv.appendChild(childDiv);
    counter++;
  }

  return document.body.appendChild(rootDiv);
}

render();

test("Checks that the board was loaded", () => {
  render();
  var checkBoard = document.getElementById("board");
  var checkTile = document.getElementById("P1of9");
  //console.log(checkBoard.children.length);
  expect(checkTile.id == "P1of9" && checkBoard.children.length == 9).toBe(true);
});

// test("Checks that the board was shuffled on load", () => {
//   //tileBoard
//   //var tileBoard = document.getElementById("board");
//   //console.log(tileBoard);
//   var correctOrder = [...tileBoard];
//   //shuffleBoard();
//   var randomOrder = [...tileBoard.children];
//   expect(correctOrder == randomOrder).toBe(false);
// });
