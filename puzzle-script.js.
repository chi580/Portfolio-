const board = document.getElementById("board");

const puzzleSets = {
  3: [1015, 1025, 1039, 1043, 1050],
  4: [1002, 1011, 1016, 1018, 1024],
  5: [1035, 1040, 1041, 1044, 1047]
};

let size = 3;
let currentLevel = 0;
let tiles = [];
let moveCount = 0;

function makeSolvedTiles() {
  const arr = [];
  for (let i = 1; i < size * size; i++) arr.push(i);
  arr.push(null);
  return arr;
}

function getCurrentImage() {
  const id = puzzleSets[size][currentLevel];
  return "https://picsum.photos/id/" + id + "/300/300";
}

function updateLevelIndicator() {
  document.getElementById("levelIndicator").textContent =
    "Puzzle " + (currentLevel + 1) + " of " + puzzleSets[size].length;
}

function isAdjacent(a, b) {
  const rowA = Math.floor(a / size);
  const colA = a % size;
  const rowB = Math.floor(b / size);
  const colB = b % size;
  const rowDiff = Math.abs(rowA - rowB);
  const colDiff = Math.abs(colA - colB);
  return (rowDiff + colDiff) === 1;
}

function render() {
  const pieceSize = 300 / size;
  const imageUrl = getCurrentImage();
  board.innerHTML = "";

  tiles.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    const row = Math.floor(index / size);
    const col = index % size;
    tile.style.width = pieceSize + "px";
    tile.style.height = pieceSize + "px";
    tile.style.left = (col * pieceSize) + "px";
    tile.style.top = (row * pieceSize) + "px";

    if (value === null) {
      tile.classList.add("blank");
    } else {
      const correctIndex = value - 1;
      const cRow = Math.floor(correctIndex / size);
      const cCol = correctIndex % size;
      tile.style.backgroundImage = "url('" + imageUrl + "')";
      tile.style.backgroundSize = "300px 300px";
      tile.style.backgroundPosition = (-cCol * pieceSize) + "px " + (-cRow * pieceSize) + "px";
      tile.addEventListener("pointerdown", (e) => startDrag(e, index, tile));
    }
    board.appendChild(tile);
  });
}

function startDrag(e, index, tileEl) {
  const blankIndex = tiles.indexOf(null);
  if (!isAdjacent(index, blankIndex)) return;

  const pieceSize = 300 / size;
  const rowT = Math.floor(index / size), colT = index % size;
  const rowB = Math.floor(blankIndex / size), colB = blankIndex % size;
  const dirX = colB - colT;
  const dirY = rowB - rowT;
  const startX = e.clientX, startY = e.clientY;

  tileEl.style.transition = "none";
  tileEl.style.zIndex = 10;
  tileEl._dragDist = 0;

  function onMove(ev) {
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    let dist = dx * dirX + dy * dirY;
    dist = Math.max(0, Math.min(pieceSize, dist));
    tileEl.style.transform = "translate(" + (dirX * dist) + "px," + (dirY * dist) + "px)";
    tileEl._dragDist = dist;
  }

  function onUp() {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onUp);
    tileEl.style.transition = "transform 0.15s ease";

    if (tileEl._dragDist > pieceSize / 2) {
      tileEl.style.transform = "translate(" + (dirX * pieceSize) + "px," + (dirY * pieceSize) + "px)";
      tiles[blankIndex] = tiles[index];
      tiles[index] = null;
      moveCount++;
      document.getElementById("counter").textContent = "Moves: " + moveCount;
      setTimeout(() => { render(); checkWin(); }, 150);
    } else {
      tileEl.style.transform = "translate(0,0)";
    }
  }

  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", onUp);
}

function shuffle() {
  for (let i = 0; i < 200; i++) {
    const blankIndex = tiles.indexOf(null);
    const neighbors = [];
    for (let index = 0; index < size * size; index++) {
      if (isAdjacent(index, blankIndex)) neighbors.push(index);
    }
    const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    tiles[blankIndex] = tiles[randomNeighbor];
    tiles[randomNeighbor] = null;
  }
}

function checkWin() {
  const solved = makeSolvedTiles();
  const isSolved = tiles.every((value, index) => value === solved[index]);
  if (isSolved) {
    setTimeout(() => {
      document.getElementById("finalMoves").textContent = "You solved it in " + moveCount + " moves.";
      document.getElementById("winOverlay").classList.remove("hidden");
    }, 100);
  }
}

function startGame() {
  tiles = makeSolvedTiles();
  moveCount = 0;
  document.getElementById("counter").textContent = "Moves: 0";
  document.getElementById("winOverlay").classList.add("hidden");
  updateLevelIndicator();
  shuffle();
  render();
}

function goToNextPuzzle() {
  currentLevel = (currentLevel + 1) % puzzleSets[size].length;
  startGame();
}

document.getElementById("newGameBtn").addEventListener("click", startGame);
document.getElementById("playAgainBtn").addEventListener("click", startGame);
document.getElementById("nextPuzzleBtn").addEventListener("click", goToNextPuzzle);
document.getElementById("winNextBtn").addEventListener("click", goToNextPuzzle);

document.querySelectorAll(".diffBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diffBtn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    size = Number(btn.dataset.size);
    currentLevel = 0;
    startGame();
  });
});

document.querySelector(".diffBtn").classList.add("active");
startGame();
