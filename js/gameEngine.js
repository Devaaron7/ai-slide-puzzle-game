"use strict";

//const { tileBoard } = require("./arcade");

const tileBoard = renderArcade();
//const menu = renderMainMenu();
const winningPattern = [...tileBoard.getElementById("board").children];
shuffleBoard();
const currentPattern = [...tileBoard.getElementById("board").children];
var clockCounter = document.getElementById("clockText");
var selectButton = document.getElementById("buttonOnly");
var minutes = 0;
var seconds = 0;
var zeroSeconds = 0;
var numberOfTileMoves = 0;
setInterval(startTimer, 1000);
var sfx = new Audio(
  "https://drive.google.com/uc?id=13a8dopqZFTTOCOgFd-Qpgbd8lAhxLw0q"
);

sfx.load();

// variables & functions used in testing
let listOfWinningPattern = [];
let listOfCurrentPattern = [];
getWinningPattern();
getCurrentPattern();
module.exports = { listOfWinningPattern, listOfCurrentPattern, move };

function showCheat() {
  if (numberOfTileMoves > 3) {
    selectButton.removeAttribute("hidden");
  }
}

function tileSfx() {
  sfx.play();
}

function startTimer() {
  if (seconds == 10) {
    zeroSeconds = "";
  }
  if (seconds == 60) {
    minutes += 1;
    seconds = 0;
    zeroSeconds = 0;
  }
  var minutesString = minutes.toString();
  var secondsString = seconds.toString();
  var zeroSecondsString = zeroSeconds.toString();
  var formattedTimer = minutesString.concat(
    ":",
    zeroSecondsString,
    secondsString
  );
  clockText.innerText = formattedTimer;

  seconds += 1;
}

// function renderMainMenu() {
//   const section = document.createElement("section");

//   var animatedMenuBkg = document.createElement("div");
//   var menuTitle = document.createElement("div");
//   var menuArcade = document.createElement("div");
//   var menuCustom = document.createElement("div");
//   var menuCredits = document.createElement("div");

//   animatedMenuBkg.setAttribute("id", "game-bkg");
//   menuTitle.setAttribute("id", "game-title");
//   menuArcade.setAttribute("id", "game-arcade");
//   menuCustom.setAttribute("id", "game-custom");
//   menuCredits.setAttribute("id", "game-credits");

//   menuTitle.innerHTML = "SLIDE PUZZLE GAME";
//   menuArcade.innerHTML = "ARCADE";
//   menuCustom.innerHTML = "CUSTOM";
//   menuCredits.innerHTML = "CREDITS";

//   section.appendChild(animatedMenuBkg);
//   section.appendChild(menuTitle);
//   section.appendChild(menuArcade);
//   section.appendChild(menuCustom);
//   section.appendChild(menuCredits);

//   document.body.appendChild(section);

//   return document;
// }

function clearPage() {
  document.getElementById("root").replaceChildren();
}

function renderArcade() {
  //clearPage();
  // Create sections
  const section = document.createElement("section");
  const rootDiv = document.createElement("div");
  const settingsBar = document.createElement("div");
  var audioPlayer = document.createElement("audio");
  var audioSource = document.createElement("source");
  var animatedBkg = document.createElement("div");
  var blankDiv = document.createElement("div");
  var cheatDiv = document.createElement("div");
  var clockDiv = document.createElement("div");
  var clockText = document.createElement("p");
  var cheatButton = document.createElement("button");

  // Assign attributes to sections
  section.setAttribute("id", "root");
  audioPlayer.controls = true;
  audioSource.setAttribute(
    "src",
    "https://drive.google.com/uc?id=12G3rsqjOGW4-XMZIFD76v8WDBpFFl2zs"
  );
  audioSource.setAttribute("type", "audio/mpeg");
  animatedBkg.setAttribute("id", "backgroundMovie");
  //cheatButton.setAttribute("onclick", "cheat();");
  cheatButton.setAttribute("onclick", "renderMainMenu();");
  cheatButton.innerText = "CHEAT";
  cheatButton.style.fontSize = "40px";
  clockText.innerText = "TESTING";
  rootDiv.setAttribute("id", "board");
  rootDiv.setAttribute("class", "main-board");
  settingsBar.setAttribute("class", "settings");
  cheatButton.setAttribute("id", "buttonOnly");
  cheatButton.setAttribute("hidden", "hidden");
  blankDiv.setAttribute("id", "blank_page");
  cheatDiv.setAttribute("id", "cheat");
  clockDiv.setAttribute("id", "clock");
  clockText.setAttribute("id", "clockText");

  var counter = 1;

  for (var i = 0; i < 9; i++) {
    var childDiv = document.createElement("div");
    childDiv.setAttribute("id", `P${counter}of9`);
    childDiv.setAttribute("onclick", "move(this);");
    rootDiv.appendChild(childDiv);
    counter++;
  }

  // add created elements to document
  section.appendChild(audioPlayer);
  audioPlayer.appendChild(audioSource);
  section.appendChild(animatedBkg);
  document.body.appendChild(section);

  section.appendChild(rootDiv);
  section.appendChild(settingsBar);
  settingsBar.appendChild(blankDiv);
  blankDiv.appendChild(clockText);
  settingsBar.appendChild(cheatDiv);
  cheatDiv.appendChild(cheatButton);
  settingsBar.appendChild(clockDiv);
  clockDiv.appendChild(clockText);

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
    tileSfx();
    showCheat();
    numberOfTileMoves += 1;
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
