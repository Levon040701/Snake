const gameBoard = document.getElementById('game');
const scoreElement = document.createElement('div');
let score;
const boardSize = 10;
let snake = [{x: 2, y: 2}];
let food = {x: 5, y: 5};
let direction = {x: 1, y: 0};

function initBoard() {
    score = 0;
    scoreElement.innerText = 'Score: ' + score;
    document.body.prepend(scoreElement);

    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameBoard.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', 'cell-' + i + '-' + j);
            gameBoard.append(cell);
        }
    }
}

function drawGame() {
    document.querySelectorAll('.cell').forEach((cell) => (cell.className = 'cell'));
    snake.forEach((part) => {
        const snakePart = document.getElementById(`cell-${part.y}-${part.x}`);
        if (snakePart) snakePart.classList.add('snake');
    });

    const foodCell = document.getElementById(`cell-${food.y}-${food.x}`);
    if (foodCell) foodCell.classList.add('food');
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };

    if (snake.some(part => part.x === food.x && part.y === food.y)) {
        placeFood();
    }
}

function updateGame() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
        ++score;
        scoreElement.innerHTML = 'Score: ' + score;
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >=boardSize
    || head.y < 0 || head.y >=boardSize 
    || snake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
        alert('Game over!\nYour score: ' + score);
        score = 0;
        scoreElement.innerText = 'Score: ' + score;
        snake = [{x: 2, y: 2}];
        direction = {x: 0, y: 0};
        placeFood();
    }

    drawGame();
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y == 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y == 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x == 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x == 0) direction = {x: 1, y: 0};
            break;
    }
})

initBoard();
setInterval(() => {
    updateGame();
}, 500)

