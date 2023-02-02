"use strict";

const puppeteer = require("puppeteer");

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const { listOfWinningPattern, listOfCurrentPattern } = require("./script");

let browser;
let page;
jest.setTimeout(10000);

// Setup
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    slowMo: 500,
  });
  [page] = await browser.pages();

  await page.goto("http://127.0.0.1:5500/index.html");
});

// Tear Down
afterEach(async () => {
  await sleep(1);
  await browser.close();
});

// Tests
describe("Checks that the board was loaded", () => {
  test("", async () => {
    let setup = await page.evaluate(() => {
      cheat();
    });

    const firstTile = await page.$eval("#P1of9", (tile) => tile.id);
    const lastTile = await page.$eval("#P9of9", (tile) => tile.id);
    const tileCount = await page.$eval(
      "#board",
      (tile) => tile.children.length
    );

    expect(
      firstTile == "P1of9" && lastTile == "P9of9" && tileCount == 9,
      "Should return true if all the Divs with the tile IDs was loaded into the DOM"
    ).toBe(true);
  });
});

describe("Checks that board was shuffled", () => {
  test("", async () => {
    let isBoardShuffled = false;
    let counterCheck = 0;

    for (var i = 0; i < 8; i++) {
      if (listOfWinningPattern[i] == listOfCurrentPattern[i]) {
        counterCheck += 1;

        if (counterCheck == 8) {
          isBoardShuffled = false;
        } else {
          isBoardShuffled = true;
        }
      }
    }

    expect(
      isBoardShuffled,
      "This should be true unless the shuffle function isn't working. The current tile state matches the inital state."
    ).toBe(true);
  });
});

describe("Checks that cheat function puts the board in the win state", () => {
  test("", async () => {
    let setup = await page.evaluate(() => {
      cheat();
    });

    const eighthTileSelected = await page.$eval("#P8of9", (tile) =>
      tile.click()
    );

    const eighthTileId = await page.$eval("#P8of9", (tile) => tile.id);

    const idOfTileInEightSlot = await page.$eval(
      "#board",
      (tileBoard) => tileBoard.children[8].id
    );

    // console.log(idOfTileInEightSlot);
    // console.log(eighthTileId);
    expect(
      idOfTileInEightSlot == eighthTileId,
      "Should return true if cheat function & tile move on click is working correctly"
    ).toBe(true);
  });
});

describe("Check if invalid tiles move on click", () => {
  test("", async () => {
    let didBoardMove = null;
    let counterCheck = 0;

    let setup = await page.evaluate(() => {
      cheat();
    });

    let clickInvalidTiles = await page.$eval("#board", (tile) => {
      let invalidTiles = [];
      invalidTiles.push(tile.children[0]);
      invalidTiles.push(tile.children[1]);
      invalidTiles.push(tile.children[2]);
      invalidTiles.push(tile.children[3]);
      invalidTiles.push(tile.children[4]);
      invalidTiles.push(tile.children[6]);

      for (var i = 0; i < invalidTiles.length; i++) {
        invalidTiles[i].click();
      }
    });

    let listOfIdsFromBoardAfterClickingInvalidTiles = await page.$eval(
      "#board",
      (tile) => {
        let pattern = [];

        for (var i = 0; i < tile.children.length; i++) {
          pattern.push(tile.children[i].id);
        }
        return pattern;
      }
    );

    for (var i = 0; i < 8; i++) {
      if (
        listOfWinningPattern[i].id ==
        listOfIdsFromBoardAfterClickingInvalidTiles[i]
      ) {
        counterCheck += 1;
        if (counterCheck == 8) {
          didBoardMove = false;
        } else {
          didBoardMove = true;
        }
      }
    }

    expect(
      didBoardMove,
      "Should return false as long as logic for invalid tiles is working"
    ).toBe(false);
  });
});

describe("Check if valid tiles move on click", () => {
  test("", async () => {
    let didBoardMove = null;
    let counterCheck = 0;

    let setup = await page.evaluate(() => {
      cheat();
    });

    let clickValidTiles = await page.$eval("#board", (tile) => {
      let validTiles = [];
      validTiles.push(tile.children[5]);
      validTiles.push(tile.children[4]);
      validTiles.push(tile.children[1]);
      validTiles.push(tile.children[0]);
      validTiles.push(tile.children[3]);
      validTiles.push(tile.children[5]);

      for (var i = 0; i < validTiles.length; i++) {
        validTiles[i].click();
      }
    });

    let listOfIdsFromBoardAfterClickingValidTiles = await page.$eval(
      "#board",
      (tile) => {
        let pattern = [];

        for (var i = 0; i < tile.children.length; i++) {
          pattern.push(tile.children[i].id);
        }
        return pattern;
      }
    );

    for (var i = 0; i < 8; i++) {
      if (
        listOfWinningPattern[i].id ==
        listOfIdsFromBoardAfterClickingValidTiles[i]
      ) {
        counterCheck += 1;
        if (counterCheck == 8) {
          didBoardMove = false;
        } else {
          didBoardMove = true;
        }
      }
    }

    expect(
      didBoardMove,
      "Should return true as long as logic for valid tiles is working"
    ).toBe(true);
  });
});

describe("Check for cheat button after 5 tile moves", () => {
  test("", async () => {
    let setup = await page.evaluate(() => {
      cheat();
    });

    let clickValidTiles = await page.$eval("#board", (tile) => {
      let validTiles = [];
      validTiles.push(tile.children[5]);
      validTiles.push(tile.children[4]);
      validTiles.push(tile.children[1]);
      validTiles.push(tile.children[0]);
      validTiles.push(tile.children[3]);

      for (var i = 0; i < validTiles.length; i++) {
        validTiles[i].click();
      }
    });

    let isCheatButtonHidden = await page.$eval("#buttonOnly", (button) => {
      var result = button.hasAttribute("hidden");
      return result;
    });

    expect(
      isCheatButtonHidden,
      "Should return false as the button shows after 5 moves"
    ).toBe(false);
  });
});
