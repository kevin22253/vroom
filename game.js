const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player car
const car = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 100,
    width: 60,
    height: 100,
    speed: 5,
    image: new Image(),
};

// Opponent cars
const opponents = [];

// Scoring
let score = 0;

// Menu variables
const carOptions = ['car_blue.png', 'car_red.png', 'car_yellow.png'];
let selectedCarIndex = 0;

// Load car images
for (let i = 0; i < carOptions.length; i++) {
    const image = new Image();
    image.src = carOptions[i];
    carOptions[i] = image;
}

}

car.image = carOptions[selectedCarIndex];

function drawCar() {
    ctx.drawImage(car.image, car.x, car.y, car.width, car.height);
}

function drawOpponents() {
    ctx.fillStyle = 'red';
    for (let opponent of opponents) {
        ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
    }
}

function drawMenu() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Select Your Car', canvas.width / 2 - 150, 50);

for (let i = 0; i < carOptions.length; i++) {
    const x = canvas.width / 2 - 60 + i * 120;
    const y = canvas.height / 2 - 50;
    ctx.drawImage(carOptions[i], x, y, 60, 100);

    if (i === selectedCarIndex) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5;
        ctx.strokeRect(x, y, 60, 100);
    }
}

}

function updateGameArea() {
    if (inMenu) {
        drawMenu();
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the player car
    if (keys.ArrowLeft && car.x > 0) {
        car.x -= car.speed;
    }
    if (keys.ArrowRight && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }

    // Move opponents
    for (let opponent of opponents) {
        opponent.y += 5;
        if (opponent.y > canvas.height) {
            opponent.y = 0 - opponent.height;
            opponent.x = Math.random() * (canvas.width - opponent.width);
            score += 10;
        }

        // Check for collisions with player car
        if (
            car.x < opponent.x + opponent.width &&
            car.x + car.width > opponent.x &&
            car.y < opponent.y + opponent.height &&
            car.y + car.height > opponent.y
        ) {
            alert(`Game Over! Your Score: ${score}`);
            resetGame();
        }
    }

    // Draw everything
    drawCar();
    drawOpponents();

    // Display the score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(updateGameArea);
}

function resetGame() {
    car.x = canvas.width / 2 - 30;
    car.y = canvas.height - 100;
    opponents.length = 0;
    score = 0;
    inMenu = true;
}

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    if (inMenu) {
        if (e.code === 'ArrowLeft' && selectedCarIndex > 0) {
            selectedCarIndex--;
        }
        if (e.code === 'ArrowRight' && selectedCarIndex < carOptions.length - 1) {
            selectedCarIndex++;
        }
        if (e.code === 'Enter') {
            inMenu = false;
            car.image = carOptions[selectedCarIndex];
            resetGame();
        }
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Initial setup
let inMenu = true;
drawMenu();
