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
