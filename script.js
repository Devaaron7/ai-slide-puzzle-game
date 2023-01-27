"use strict";

const tileBoard = render();
const winningPattern = [...tileBoard.getElementById("board").children];
shuffleBoard();
const currentPattern = [...tileBoard.getElementById("board").children];

// variables & functions used in testing
let listOfWinningPattern = [];
let listOfCurrentPattern = [];
getWinningPattern();
getCurrentPattern();
module.exports = { listOfWinningPattern, listOfCurrentPattern };

function render() {
  const section = document.createElement("section");
  const rootDiv = document.createElement("div");
  const settingsBar = document.createElement("div");
  var blankDiv = document.createElement("div");
  var cheatDiv = document.createElement("div");
  var clockDiv = document.createElement("div");
  var bodyText = document.createElement("p");
  var cheatButton = document.createElement("button");

  rootDiv.setAttribute("id", "board");
  rootDiv.setAttribute("class", "main-board");
  settingsBar.setAttribute("class", "settings");
  blankDiv.setAttribute("id", "blank_page");
  cheatDiv.setAttribute("id", "cheat");
  clockDiv.setAttribute("id", "clock");

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
  section.appendChild(settingsBar);
  settingsBar.appendChild(blankDiv);
  blankDiv.appendChild(bodyText);
  settingsBar.appendChild(cheatDiv);
  cheatDiv.appendChild(cheatButton);
  settingsBar.appendChild(clockDiv);
  clockDiv.appendChild(bodyText);

  return document;
}

function clearBoard() {
  tileBoard.replaceChildren();
  tileBoard.innerHTML = "";
}

async function getWinningPattern() {
  for (var i = 0; i < winningPattern.length; i++) {
    listOfWinningPattern.push(winningPattern[i]);
  }
}

async function getCurrentPattern() {
  for (var i = 0; i < currentPattern.length; i++) {
    listOfCurrentPattern.push(currentPattern[i]);
  }
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

function tilesInSameRow(listOfRows, currentTileArray, tileAIndex, tileBIndex) {
  var answer = null;
  var results = [];
  var counter = 0;

  for (var i = 0; i < listOfRows.length; i++) {
    if (listOfRows[i].includes(currentTileArray[tileAIndex].id)) {
      counter++;
    }
    if (listOfRows[i].includes(currentTileArray[tileBIndex].id)) {
      counter++;
    }
    results.push(counter);
    counter = 0;
  }

  if (results.includes(2)) {
    answer = true;
  }
  return answer;
}

function move(element) {
  let finalTile = tileBoard.getElementById("P9of9");

  let arr = [...tileBoard.getElementById("board").children];

  let topRowTiles = [arr[0].id, arr[1].id, arr[2].id];
  let middleRowTiles = [arr[3].id, arr[4].id, arr[5].id];
  let bottomRowTiles = [arr[6].id, arr[7].id, arr[8].id];
  var allRows = [topRowTiles, middleRowTiles, bottomRowTiles];

  let tileToMoveIndex = arr.indexOf(element);
  let finalTileIndex = arr.indexOf(finalTile);

  let checkMoveNumber = finalTileIndex - tileToMoveIndex;

  if (!tilesInSameRow(allRows, arr, tileToMoveIndex, finalTileIndex)) {
    if (checkMoveNumber == -1 || checkMoveNumber == 1) {
      checkMoveNumber = 0;
    }
  }

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
