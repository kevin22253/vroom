const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player car
const car = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 100,
    width: 60,
    height: 100,
    speed: 5,
};

// Obstacles
const obstacles = [];

function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function updateGameArea() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the player car
    if (keys.ArrowLeft && car.x > 0) {
        car.x -= car.speed;
    }
    if (keys.ArrowRight && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }

    // Move obstacles
    for (let obstacle of obstacles) {
        obstacle.y += 5;
        if (obstacle.y > canvas.height) {
            obstacle.y = 0 - obstacle.height;
            obstacle.x = Math.random() * (canvas.width - obstacle.width);
        }

        // Check for collisions
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            alert('Game Over!');
            resetGame();
        }
    }

    // Draw everything
    drawCar();
    drawObstacles();

    requestAnimationFrame(updateGameArea);
}

function resetGame() {
    car.x = canvas.width / 2 - 30;
    car.y = canvas.height - 100;
    obstacles.length = 0;
}

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Initial setup
resetGame();
updateGameArea();
