var tileBoard = document.getElementById("board");
var winningPattern = [...tileBoard.children];
var current = [];
var winner = [];

function shuffleBoard() {
  //var tileBoard = document.getElementById("board");
  var arr = [...tileBoard.children];
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

  tileBoard.replaceChildren();

  for (const element of arr) {
    tileBoard.append(element);
  }
}

function move(element) {
  //var tileBoard = document.getElementById("board");
  var finalTile = document.getElementById("P9of9");

  var arr = [...tileBoard.children];

  var tileToMoveIndex = arr.indexOf(element);
  var finalTileIndex = arr.indexOf(finalTile);
  var checkMoveNumber = finalTileIndex - tileToMoveIndex;
  var validMoves = [1, -1, 3, -3];
  var isMoveVaild = validMoves.includes(checkMoveNumber);

  if (isMoveVaild) {
    arr[tileToMoveIndex] = finalTile;
    arr[finalTileIndex] = element;

    tileBoard.replaceChildren();

    for (const element of arr) {
      tileBoard.append(element);
    }

    checkWinner(arr);
  }
}

function checkWinner(arrayToCheck) {
  //console.log(arrayToCheck == winningPattern);

  win = false;

  for (i = 0; i < arrayToCheck.length; i++) {
    current.push(arrayToCheck[i]);
  }

  for (i = 0; i < winningPattern.length; i++) {
    winner.push(winningPattern[i]);
  }

  for (i = 0; i < 8; i++) {
    if (current[i] == winner[i]) {
      win = true;
    } else {
      break;
    }
  }

  console.log(win);
  console.log(arrayToCheck);
  console.log(winningPattern);
  if (arrayToCheck == winningPattern) {
    alert("You Win!!!");
  }

  current = [];
  winner = [];
}

function cheat() {
  tileBoard.replaceChildren();

  for (const element of winningPattern) {
    tileBoard.append(element);
  }
}
