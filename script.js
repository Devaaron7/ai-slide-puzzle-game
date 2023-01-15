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

  let topRowTiles = [arr[0].id, arr[1].id, arr[2].id];
  let middleRowTiles = [arr[3].id, arr[4].id, arr[5].id];
  let bottomRowTiles = [arr[6].id, arr[7].id, arr[8].id];

  //console.log(topRowTiles);
  let tileToMoveIndex = arr.indexOf(element);
  let finalTileIndex = arr.indexOf(finalTile);
  // Bug - Possible to do invalid move as -1 will allow 4th block to swap with 3rd block. Will revise
  var checkMoveNumber = finalTileIndex - tileToMoveIndex;
  let isInTopRow = new Boolean(
    topRowTiles.includes(arr[tileToMoveIndex].id) &&
      topRowTiles.includes(arr[finalTileIndex].id)
  );

  let isInMiddleRow = new Boolean(
    middleRowTiles.includes(arr[tileToMoveIndex].id) &&
      middleRowTiles.includes(arr[finalTileIndex].id)
  );

  let isInBottomRow = new Boolean(
    bottomRowTiles.includes(arr[tileToMoveIndex].id) &&
      bottomRowTiles.includes(arr[finalTileIndex].id)
  );
  debugger;
  //let cornerTiles = [2, 5, 6];
  // prettier-ignore
  // if (checkMoveNumber == -1 || checkMoveNumber == 1) {
  //   //add a check to confirm tile to swap is in same row
  //   if (isInTopRow == false) {
  //     checkMoveNumber = 0;
  //   } else {
  //     checkMoveNumber = finalTileIndex - tileToMoveIndex;
  //   }

  //   if (!isInMiddleRow == false) {
  //     checkMoveNumber = 0;
  //   } else {
  //     checkMoveNumber = finalTileIndex - tileToMoveIndex;
  //   }

  //   if (!isInBottomRow == false) {
  //     checkMoveNumber = 0;
  //   } else {
  //     checkMoveNumber = finalTileIndex - tileToMoveIndex;
  //   }
  // }

  let validMoves = [1, -1, 3, -3];
  if (isInTopRow == false) {
    if (checkMoveNumber == -1 || checkMoveNumber == 1) {
      checkMoveNumber = 0;
    }
  }

  if (isInMiddleRow == false) {
    if (checkMoveNumber == -1 || checkMoveNumber == 1) {
      checkMoveNumber = 0;
    }
  }

  if (isInBottomRow == false) {
    if (checkMoveNumber == -1 || checkMoveNumber == 1) {
      checkMoveNumber = 0;
    }
  }

  let isMoveVaild = validMoves.includes(checkMoveNumber);
  debugger;
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
  var win = false;
  var counterCheck = 0;

  for (var i = 0; i < arrayToCheck.length; i++) {
    current.push(arrayToCheck[i]);
  }

  for (var i = 0; i < winningPattern.length; i++) {
    winner.push(winningPattern[i]);
  }

  for (var i = 0; i < 8; i++) {
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
