const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const timerDisplay = document.getElementById('timer');

let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

let score = 0;
let timeLeft = 120; // 2 minutes
let timerInterval;
let startTime;

function startGame() {
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  score = 0;
  addRandomTile();
  addRandomTile();
  drawBoard();
  startTime = Date.now();
  startTimer();
  document.getElementById('game-complete').classList.add('hidden');
}

// End of game
function endGame() {
  clearInterval(timerInterval);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const gameID = '2048-' + Date.now();
  document.getElementById('game-duration').textContent = duration;
  document.getElementById('game-id').textContent = gameID;
  document.getElementById('congrats-msg').textContent = `Congratulations, Player! 🎉 Your score: ${score}`;
  document.getElementById('game-complete').classList.remove('hidden');

  uploadProof(score, gameID); // Simulate proof upload
}

// Timer update
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if(timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Update your previous uploadProof stub
async function uploadProof(score, gameID) {
  const uploadStatus = document.getElementById('upload-status');
  uploadStatus.textContent = 'Generating proof and uploading to Walrus... ⏳';

  // Simulate delay for uploading
  setTimeout(() => {
    uploadStatus.textContent = '✅ Proof uploaded successfully!';
    console.log(`Proof uploaded for Game ID: ${gameID}, Score: ${score}`);
  }, 3000); // 3 seconds
}

// Optional: Check Status button
document.getElementById('check-status-btn').addEventListener('click', () => {
  alert('Status checked! Proof is live on Walrus.');
});


function startGame() {
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  score = 0;
  addRandomTile();
  addRandomTile();
  drawBoard();
  startTimer();
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
  document.getElementById('score').textContent = `Score: ${score}`;
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
      score += arr[i];
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
  if(timeLeft <= 0) return;

  if(direction === 'up'){
    rotateGrid();
  } else if(direction === 'down'){
    rotateGrid();
    grid = grid.map(row => row.reverse());
  } else if(direction === 'right'){
    grid = grid.map(row => row.reverse());
  }

  grid = grid.map(row => moveLeft(row));

  if(direction === 'up'){
    rotateGrid();
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
  if(timeLeft <= 0) return;
  if(e.key === 'ArrowUp') move('up');
  else if(e.key === 'ArrowDown') move('down');
  else if(e.key === 'ArrowLeft') move('left');
  else if(e.key === 'ArrowRight') move('right');
});

restartBtn.addEventListener('click', startGame);

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if(timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Game over.");
      uploadProof(score); // Upload score to Walrus
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
}

// Walrus upload stub
async function uploadProof(score) {
  console.log("Uploading proof to Walrus...");
  console.log("Score:", score);
  // Replace with actual Walrus SDK/API call
}

startGame();
