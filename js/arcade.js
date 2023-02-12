//const { engine } = require("./arcade");
//import { move } from "./gameEngine";
function renderArcade() {
  // clearPage();
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

const tileBoard = renderArcade();

module.exports = { tileBoard };
