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

// location and rotation states
let pRow = 0
let pCol = 0
let pRot = 0

function move() {
  if (pRow < 0 || pRow > 9) {
    throw Error("Row must be in the range 0-9")
  }
  if (pCol < 0 || pCol > 9) {
    throw Error("Column must be in the range 0-9")
  }
  p.style.transform = `translateX(${pCol * 30}px) translateY(${pRow * 30}px) rotate(${pRot}deg)`
}

function moveTo(r, c) {
  pRow = r
  pCol = c
  move()
}

function turnR() {
  pRot += 90
  move()

}

function turnL() {
  pRot -= 90
  move()
}

function turnTo(cardinalPoint) {
  switch (cardinalPoint) {
    case "N":
      pRot = -90
      break
    case "E":
      pRot = 0
      break
    case "S":
      pRot = 90
      break
    case "W":
      pRot = 180
      break
    default:
      pRot = 0
  }
  move()
}

pCol = 4
pRow = 9
turnTo("N")
move()

function walk(n) {
  // save original values
  const oldRow = pRow
  const oldCol = pCol

  let dir = pRot
  while (dir < 0) dir += 360
  // N: 270
  // E: 0
  // S: 90
  // W: 180
  switch (dir) {
    case 270:
      pRow -= n
      break
    case 0:
      pCol += n
      break
    case 90:
      pRow += n
      break
    case 180:
      pCol -= n
      break
  }
  try {
    move()
  } catch (e) {
    console.log("Could not move due to error")
    console.log(e)
    pRow = oldRow
    pCol = oldCol
  }
}

function write(s) {
  // set the current location's text
  m[pRow][pCol].innerText = s
}

function read() {
  // get the current location's text
  return m[pRow][pCol].innerText
}

function evalPlayerCode() {
  eval(document.getElementById("playerCode").value)
}

function evalStepByStep(lines) {
  if (lines.length === 0) return
  eval(lines[0])
  window.setTimeout(() => {
    evalStepByStep(lines.slice(1))
  }, 300)
}

const samplePlayerCode = `
walk(3)
turnR()
write("O HAI")
`

function color(c) {
  m[pRow][pCol].style.backgroundColor = c
}
