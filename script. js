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

    // Проверка ничьей
    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    // Завершение игры
    function endGame(message) {
        gameActive = false;
        setTimeout(() => alert(message), 10);
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
});
