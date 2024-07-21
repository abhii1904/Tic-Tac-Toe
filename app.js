// Selecting elements from the DOM
const cells = document.querySelectorAll('.cell');
const turnDisplay = document.querySelector('.turn');
const restartButton = document.querySelector('.restart-button');
const winPopup = document.querySelector('.win-popup');
const winMessage = document.querySelector('.win-message');

// Game variables
let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listener for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));

    if (cell.innerText !== '' || !gameActive) return; // Check if cell is already clicked or game is not active

    cell.innerText = currentPlayer;
    if (checkWin()) {
        displayWinPopup(currentPlayer);
        gameActive = false;
        return;
    }
    if ([...cells].every(cell => cell.innerText !== '')) {
        turnDisplay.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

// Function to check for a win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
}

// Function to display win popup
function displayWinPopup(player) {
    winMessage.textContent = `${player} wins!`;
    winPopup.style.display = 'flex'; // Display the popup
    winPopup.classList.add('animate__animated', 'animate__zoomIn'); // Add animate.css classes

    // Hide the popup after 6 seconds
    setTimeout(() => {
        winPopup.classList.remove('animate__zoomIn');
        winPopup.classList.add('animate__zoomOut');
        setTimeout(() => {
            winPopup.style.display = 'none';
            winPopup.classList.remove('animate__zoomOut');
        }, 500); // Wait for the animation to complete before hiding completely
    }, 6000); // 6000 milliseconds = 6 seconds
}

// Event listener for restart button
restartButton.addEventListener('click', () => {
    // Reset game state
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
    });
    winPopup.style.display = 'none'; // Hide the popup
    turnDisplay.innerText = `Player ${currentPlayer}'s Turn`;
});
