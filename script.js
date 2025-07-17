document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;

    // Обработчик клика по клетке
    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            endGame(`Игрок ${currentPlayer} победил!`);
            return;
        }

        if (checkDraw()) {
            endGame('Ничья!');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Проверка победы
    function checkWin() {const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
        [0, 4, 8], [2, 4, 6]             // Диагонали
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && 
            cells[a].textContent === cells[b].textContent && 
            cells[a].textContent === cells[c].textContent) {
            
            drawWinningLine(pattern);
            return true;
        }
    }
    return false;
    }
    
function drawWinningLine(cellsIndexes) {
    const [a, b, c] = cellsIndexes;
    const cell1 = cells[a];
    const cell2 = cells[c];
    const boardRect = board.getBoundingClientRect();
    
    const line = document.createElement('div');
    line.className = 'winning-line';
    
    // Определяем тип линии
    if (a === 0 && c === 2 || a === 3 && c === 5 || a === 6 && c === 8) {
        line.classList.add('horizontal');
    } else if (a === 0 && c === 6 || a === 1 && c === 7 || a === 2 && c === 8) {
        line.classList.add('vertical');
    } else if (a === 0 && c === 8) {
        line.classList.add('diagonal-1');
    } else {
        line.classList.add('diagonal-2');
    }
    
    board.appendChild(line);
}
    function showResult(message) {
    const resultElement = document.getElementById('game-result');
    document.getElementById('result-text').textContent = message;
    resultElement.classList.add('show');
}
    // Проверка ничьей
    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    // Завершение игры
    function endGame(message) {
       showResult(message);
    gameActive = false;
    }

    // Сброс игры
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameActive = true;
    }

    // Назначение обработчиков
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    resetButton.addEventListener('click', resetGame);

    // Обработчик для новой игры
document.getElementById('new-game-btn').addEventListener('click', () => {
    document.getElementById('game-result').classList.remove('show');
    resetGame();
    // Удаляем все линии
    document.querySelectorAll('.winning-line').forEach(line => line.remove());
}
});
