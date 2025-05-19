let playerScore = 0, computerScore = 0;
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerVisual = document.getElementById('player-choice-visual');
const computerVisual = document.getElementById('computer-choice-visual');
const choiceBtns = document.querySelectorAll('.choice-btn');
const winningPopup = document.getElementById('winning-popup');
const popupPlayAgainBtn = document.getElementById('popup-play-again');
const popupCloseBtn = document.getElementById('popup-close');
const playAgainBtn = document.getElementById('play-again');
const finalResult = document.getElementById('final-result');
const images = {
  rock: "Asset/Rock.png",
  paper: "Asset/Paper.png",
  scissors: "Asset/Scissors.png"
};
const choices = ["rock", "paper", "scissors"];

// Animate the default rock image up and down 3 times, then show the selected choice
function bounceRockThenShow(player, computer, result) {
  playerVisual.innerHTML = `<img id="bouncing-rock" src="${images.rock}" alt="Rock">`;
  computerVisual.innerHTML = `<img id="bouncing-rock-computer" src="${images.rock}" alt="Rock">`;
  const rockImg = document.getElementById('bouncing-rock');
  const rockImgComp = document.getElementById('bouncing-rock-computer');
  rockImg.classList.add('bouncing');
  rockImgComp.classList.add('bouncing');
  setTimeout(() => {
    playerVisual.innerHTML = `<img src="${images[player]}" alt="${player}">`;
    computerVisual.innerHTML = `<img src="${images[computer]}" alt="${computer}">`;
    animateVisual(playerVisual);
    animateVisual(computerVisual);

    let resultText = '';
    let resultClass = '';
    if (result === 'win') {
      resultText = 'You Win! 🎉';
      resultClass = 'win';
      playerScore++;
      playerScoreEl.textContent = `You: ${playerScore}`;
      computerScoreEl.textContent = `Computer: ${computerScore}`;
      showWinningPopup();
    } else {
      if (result === 'lose') {
        resultText = 'You Lose! 😢';
        resultClass = 'lose';
        computerScore++;
      } else {
        resultText = "It's a Draw! 🤝";
        resultClass = 'draw';
      }
      playerScoreEl.textContent = `You: ${playerScore}`;
      computerScoreEl.textContent = `Computer: ${computerScore}`;
      // Show result at the bottom of the page, outside the container
      finalResult.textContent = resultText;
      finalResult.className = `show ${resultClass}`;
      playAgainBtn.style.display = 'block';
    }
  }, 900);
}

// Animate visual
function animateVisual(el) {
  el.classList.remove('animate');
  void el.offsetWidth; // trigger reflow
  el.classList.add('animate');
}

// Choice button click
choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const player = btn.getAttribute('data-choice');
    const computer = choices[Math.floor(Math.random() * 3)];
    const result = getResult(player, computer);
    // Hide previous result and play again button
    finalResult.textContent = '';
    finalResult.className = '';
    playAgainBtn.style.display = 'none';
    // Disable all buttons during animation
    choiceBtns.forEach(b => b.disabled = true);
    bounceRockThenShow(player, computer, result);
  });
});

// Play Again button below the game container
playAgainBtn.addEventListener('click', resetGame);

// Popup Play Again and Close
popupPlayAgainBtn.addEventListener('click', () => {
  resetGame();
  winningPopup.style.display = 'none';
});
popupCloseBtn.addEventListener('click', () => {
  winningPopup.style.display = 'none';
});

// Result logic
function getResult(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'win';
  return 'lose';
}

// Show random gradient popup
function showWinningPopup() {
  const gradients = [
    "linear-gradient(135deg, #ffb6d5 0%, #b2d7ff 100%)",
    "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)",
    "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
  ];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  winningPopup.style.background = randomGradient;
  winningPopup.style.display = 'block';
  // Hide notification and play again button while popup is open
  finalResult.textContent = '';
  finalResult.className = '';
  playAgainBtn.style.display = 'none';
}

// Reset game state
function resetGame() {
  playerVisual.innerHTML = `<img id="default-rock" src="${images.rock}" alt="Rock">`;
  computerVisual.innerHTML = `<img id="default-rock-computer" src="${images.rock}" alt="Rock">`;
  winningPopup.style.display = 'none';
  choiceBtns.forEach(btn => btn.disabled = false);
  finalResult.textContent = '';
  finalResult.className = '';
  playAgainBtn.style.display = 'none';
}

// Set --game-container-height for title positioning
function setGameContainerHeightVar() {
  const gameContainer = document.querySelector('.game-container');
  if (gameContainer) {
    document.documentElement.style.setProperty('--game-container-height', gameContainer.offsetHeight + 'px');
  }
}
window.addEventListener('DOMContentLoaded', () => {
  setGameContainerHeightVar();
  resetGame();
});
window.addEventListener('resize', setGameContainerHeightVar);

// Bounce animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounce {
  0%   { transform: translateY(0);}
  16%  { transform: translateY(-30px);}
  33%  { transform: translateY(0);}
  50%  { transform: translateY(-20px);}
  66%  { transform: translateY(0);}
  83%  { transform: translateY(-10px);}
  100% { transform: translateY(0);}
}
.bouncing {
  animation: bounce 0.9s cubic-bezier(.68,-0.55,.27,1.55) 1;
}
`;
document.head.appendChild(style);