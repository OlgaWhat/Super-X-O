document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const resultText = document.getElementById('result-text');
    const gameResult = document.getElementById('game-result');
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
            drawWinningLine();
            endGame(`Победил ${currentPlayer}!`);
            return;
        }

        if (checkDraw()) {
            endGame('Ничья!');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Проверка победы
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
            [0, 4, 8], [2, 4, 6]              // Диагонали
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    // Рисуем линию победы
    function drawWinningLine() {
       function drawWinningLine() {
    const line = document.createElement('div');
    line.className = 'winning-line';
    
    // Определяем тип линии
    if ([0, 1, 2].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('row-0');
    } else if ([3, 4, 5].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('row-1');
    } else if ([6, 7, 8].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('row-2');
    } else if ([0, 3, 6].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('col-0');
    } else if ([1, 4, 7].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('col-1');
    } else if ([2, 5, 8].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('col-2');
    } else if ([0, 4, 8].every(i => cells[i].textContent === currentPlayer)) {
        line.classList.add('diagonal-1');
    } else {
        line.classList.add('diagonal-2');
    }

    board.appendChild(line);
}
    }

    // Проверка ничьей
    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    // Завершение игры
    function endGame(message) {
        resultText.textContent = message;
        gameResult.classList.add('show');
        gameActive = false;
    }

    // Новая игра
    document.getElementById('new-game-btn').addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        
        document.querySelectorAll('.winning-line').forEach(line => line.remove());
        gameResult.classList.remove('show');
        currentPlayer = 'X';
        gameActive = true;
    });

    // Назначаем обработчики
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});
