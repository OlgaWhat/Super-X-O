document.addEventListener('DOMContentLoaded', () => {
    console.log("Документ загружен!"); // Проверка 1
    
    const cells = document.querySelectorAll('.cell');
    console.log("Найдено клеток:", cells.length); // Проверка 2
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log("Клик по клетке", cell.dataset.index); // Проверка 3
            cell.textContent = 'X'; // Простое присваивание
        });
    });
});
