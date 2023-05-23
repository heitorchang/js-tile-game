// Tile creator

const bodyElt = document.getElementById("body")
const playAreaElt = document.getElementById("playArea")

function createTile(r, c) {
  // Create a DOM element representing a tile in Row r and Column c
  // Rows go from top to bottom and Columns from left to right, from 0 to 9
  const tile = document.createElement("div")

  tile.id = "tile" + r.toString() + c.toString()
  tile.className = "tile"
  tile.style.top = (r * 30).toString() + 'px';
  tile.style.left = (c * 30).toString() + 'px';
  playAreaElt.appendChild(tile)
  return tile
}

function createTileRef(val, r, c) {
  const tileRef = document.createElement("div")

  tileRef.className = "tileRef"
  tileRef.innerText = val
  tileRef.style.top = (r * 30).toString() + 'px';
  tileRef.style.left = (c * 30).toString() + 'px';
  playAreaElt.appendChild(tileRef)
}

// Define 10 x 10 grid
for (let r = 0; r < 10; r++) {
  for (let c = 0; c < 10; c++) {
    createTile(r, c)
  }
}

// row tileRefs
for (let r = 0; r < 10; r++) {
  createTileRef(r, r, -1)
}

// column tileRefs
for (let c = 0; c < 10; c++) {
  createTileRef(c, -1, c)
}

// initialize player and tile matrix
const p = document.getElementById("player")
const m = []
for (let r = 0; r < 10; r++) {
  const row = []
  for (let c = 0; c < 10; c++) {
    row.push(document.getElementById("tile" + r.toString() + c.toString()))
  }
  m.push(row)
}

p.style.left = '0px';
p.style.top = '0px';
