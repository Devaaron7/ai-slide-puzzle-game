"use strict";
const tileBoard = render();
const winningPattern = [...tileBoard.getElementById("board").children];
shuffleBoard();

module.exports = {
  render,
  shuffleBoard,
  move,
  checkWinner,
  cheat,
};

function render() {
  const section = document.createElement("section");
  const rootDiv = document.createElement("div");
  rootDiv.setAttribute("id", "board");
  rootDiv.setAttribute("class", "main-board");

  var counter = 1;
  for (var i = 0; i < 9; i++) {
    var childDiv = document.createElement("div");
    childDiv.setAttribute("id", `P${counter}of9`);
    childDiv.setAttribute("onclick", "move(this);");
    rootDiv.appendChild(childDiv);
    counter++;
  }
  document.body.appendChild(section);
  section.appendChild(rootDiv);

  return document;
}

function shuffleBoard() {
  let arr = [...tileBoard.getElementById("board").children];
  let currentIndex = arr.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  tileBoard.getElementById("board").replaceChildren();

  for (const items of arr) {
    tileBoard.getElementById("board").append(items);
  }
}

function move(element) {
  let finalTile = tileBoard.getElementById("P9of9");

  let arr = [...tileBoard.getElementById("board").children];

  let tileToMoveIndex = arr.indexOf(element);
  let finalTileIndex = arr.indexOf(finalTile);
  let checkMoveNumber = finalTileIndex - tileToMoveIndex;
  let validMoves = [1, -1, 3, -3];
  let isMoveVaild = validMoves.includes(checkMoveNumber);

  if (isMoveVaild) {
    arr[tileToMoveIndex] = finalTile;
    arr[finalTileIndex] = element;

    tileBoard.getElementById("board").replaceChildren();

    for (const element of arr) {
      tileBoard.getElementById("board").append(element);
    }

    checkWinner(arr);
  }
}

function checkWinner(arrayToCheck) {
  var current = [];
  var winner = [];
  win = false;
  var counterCheck = 0;

  for (i = 0; i < arrayToCheck.length; i++) {
    current.push(arrayToCheck[i]);
  }

  for (i = 0; i < winningPattern.length; i++) {
    winner.push(winningPattern[i]);
  }

  for (i = 0; i < 8; i++) {
    if (current[i] == winner[i]) {
      counterCheck += 1;
      if (counterCheck == 8) {
        win = true;
      }
    }
  }

  if (win) {
    alert("You Win!!!");
  }

  current = [];
  winner = [];
}

function cheat() {
  tileBoard.getElementById("board").replaceChildren();

  for (const element of winningPattern) {
    tileBoard.getElementById("board").append(element);
  }
}
