const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const updateStatus = () => {
    statusText.textContent = `${currentPlayer}'s turn`;
};

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            statusText.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }

    if (!boardState.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    }
};

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWin();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) updateStatus();
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

updateStatus();
