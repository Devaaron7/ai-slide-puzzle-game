var tileBoard = document.getElementById("board");
var winningPattern = [...tileBoard.children];
var current = [];
var winner = [];

//module.exports = { tileBoard };
//module.exports.winningPattern = winningPattern;

//document.body.onload = render();

//render();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function render() {
  //const element = document.createElement(htmlTag);

  const rootDiv = document.createElement("div");
  rootDiv.setAttribute("id", "board");

  var counter = 0;
  for (i = 0; i < 9; i++) {
    var childDiv = document.createElement("div");
    childDiv.setAttribute("id", `P${counter}of9`);
    rootDiv.appendChild(childDiv);
  }

  return document.body.appendChild(rootDiv);

  // e.innerHTML = "JavaScript DOM";
  // document.body.appendChild(e);
  // var textnode = document.createTextNode("JavaScript DOM");
  // e.appendChild(textnode);
}

//module.exports = { render };

function shuffleBoard() {
  //var tileBoard = document.getElementById("board");
  var tileBoard = document.getElementById("board");
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
// module.exports = shuffleBoard;

function move(element) {
  var tileBoard = document.getElementById("board");
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
  counterCheck = 0;

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
  tileBoard.replaceChildren();

  for (const element of winningPattern) {
    tileBoard.append(element);
  }
}
