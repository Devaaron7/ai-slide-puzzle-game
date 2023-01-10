//var finalTile = document.getElementById("P9of9");
//var tileBoard = document.getElementById("parent");
var tileBoard = document.getElementById("board");

function move(element) {
  var tileToMoveId = element.id;
  var finalTile = document.getElementById("P9of9");
  // var tileToMoveIndex = tileBoard.children.id.indexOf(element.id);
  var arr = [...tileBoard.children];
  //var tileToMoveIndex = arr[0];
  var tileToMoveIndex = arr.indexOf(element);
  var finalTileIndex = arr.indexOf(finalTile);
  //var tileToMoveIndex = arr.item("P1of9");
  //var tileToMove = document.getElementById(tileToMoveId);
  //var testmoveitem = tileBoard.children[7];
  //var testswapitem = tileBoard.children[8];

  //   var parent = element.parentNode;
  //   alert(tileToMove);
  //   var content = parent.querySelector("div");
  // var content = parent
  //   alert(content.id);
  // tileToMove.style.left = "354px";
  // tileToMove.style.left = "-354px";
  // tileToMove.style.top = "206px";

  //console.log(tileToMoveIndex);
  //console.log(finalTileIndex);

  console.log(arr);

  arr[tileToMoveIndex] = finalTile;

  arr[finalTileIndex] = element;

  tileBoard.replaceChildren();

  for (const element of arr) {
    tileBoard.append(element);
  }

  //tileBoard.appendChild(arr);

  //tileBoard.children.push(arr);

  //tileBoard.replaceChildren(element, finalTile);

  //console.log(arr);

  //tileBoard.children = arr;
  //console.log(element.id);
  //Moves the 1st item immediately infront of the last item
  //tileBoard.insertBefore(testswapitem, tileBoard.children[7]);

  //tileBoard.insertAdjacentElement("beforebegin", tileBoard.children[1]);

  //tileBoard.children[-1] = testmoveitem;
  //console.log(tileBoard.children[0]);
  //tileToMove.style.top = "-206px";
  //   console.log(tileToMove.style.left = 354);
  //   console.log(tileToMove.style.top);
}
