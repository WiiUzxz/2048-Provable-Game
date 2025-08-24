const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

function startGame() {
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  addRandomTile();
  addRandomTile();
  drawBoard();
}

function drawBoard() {
  board.innerHTML = '';
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      const tile = document.createElement('div');
      const value = grid[i][j];
      tile.classList.add('tile');
      if(value) tile.classList.add(`tile-${value}`);
      tile.textContent = value ? value : '';
      board.appendChild(tile);
    }
  }
}

function addRandomTile() {
  const emptyTiles = [];
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      if(grid[i][j] === 0) emptyTiles.push([i,j]);
    }
  }
  if(emptyTiles.length === 0) return;
  const [x,y] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[x][y] = Math.random() < 0.9 ? 2 : 4;
}

function moveLeft(row) {
  let arr = row.filter(val => val);
  for(let i=0;i<arr.length-1;i++){
    if(arr[i] === arr[i+1]){
      arr[i] *= 2;
      arr[i+1] = 0;
    }
  }
  arr = arr.filter(val => val);
  while(arr.length < 4) arr.push(0);
  return arr;
}

function rotateGrid() {
  let newGrid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      newGrid[i][j] = grid[j][i];
    }
  }
  grid = newGrid;
}

function move(direction) {
  let rotated = false;
  if(direction === 'up'){
    rotateGrid();
    rotated = true;
  } else if(direction === 'down'){
    rotateGrid();
    grid = grid.map(row => row.reverse());
    rotated = true;
  } else if(direction === 'right'){
    grid = grid.map(row => row.reverse());
  }

  grid = grid.map(row => moveLeft(row));

  if(direction === 'up'){
    rotateGrid();
    rotated = false;
  } else if(direction === 'down'){
    grid = grid.map(row => row.reverse());
    rotateGrid();
  } else if(direction === 'right'){
    grid = grid.map(row => row.reverse());
  }

  addRandomTile();
  drawBoard();
}

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowUp') move('up');
  else if(e.key === 'ArrowDown') move('down');
  else if(e.key === 'ArrowLeft') move('left');
  else if(e.key === 'ArrowRight') move('right');
});

restartBtn.addEventListener('click', startGame);

startGame();

