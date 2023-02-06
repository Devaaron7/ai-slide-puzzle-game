function renderMainMenu() {
  const section = document.createElement("section");

  var animatedMenuBkg = document.createElement("div");
  var menuTitle = document.createElement("div");
  var menuArcade = document.createElement("div");
  var menuCustom = document.createElement("div");
  var menuCredits = document.createElement("div");

  animatedMenuBkg.setAttribute("id", "game-bkg");
  menuTitle.setAttribute("id", "game-title");
  menuArcade.setAttribute("id", "game-arcade");
  menuCustom.setAttribute("id", "game-custom");
  menuCredits.setAttribute("id", "game-credits");

  menuTitle.innerHTML = "SLIDE PUZZLE GAME";
  menuArcade.innerHTML = "ARCADE";
  menuCustom.innerHTML = "CUSTOM";
  menuCredits.innerHTML = "CREDITS";

  section.appendChild(animatedMenuBkg);
  section.appendChild(menuTitle);
  section.appendChild(menuArcade);
  section.appendChild(menuCustom);
  section.appendChild(menuCredits);

  document.body.appendChild(section);

  return document;
}

//const menu = renderMainMenu();
