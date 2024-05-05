// Get canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get the score display element
const scoreDisplay = document.getElementById('scoreDisplay');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize the score
let score = 0;

// Shooting star properties
let star = {
    x: 0,
    y: canvas.height / 2,
    size: 5,
    speed: 5,
    dy: 0, // delta y
};

// Target properties
let target = {
    x: canvas.width - 100,
    y: Math.random() * (canvas.height - 50),
    width: 30,
    height: 30,
    color: 'red',
};

// Key event listeners
let keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the shooting star
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw the target
    ctx.fillStyle = target.color;
    ctx.fillRect(target.x, target.y, target.width, target.height);

    // Update shooting star position
    star.x += star.speed;

    // Update y position based on arrow keys
    if (keys['ArrowUp']) {
        star.dy -= 0.5;
    }
    if (keys['ArrowDown']) {
        star.dy += 0.5;
    }

    // Apply vertical movement and dampening
    star.y += star.dy;
    star.dy *= 0.9; // Dampening the vertical movement

    // Check for collision between shooting star and target
    if (
        star.x + star.size > target.x &&
        star.x - star.size < target.x + target.width &&
        star.y + star.size > target.y &&
        star.y - star.size < target.y + target.height
    ) {
        // Update score and reset the target and star positions
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        star.x = 0;
        star.y = Math.random() * canvas.height;
        star.dy = 0;
        target.x = canvas.width - 100;
        target.y = Math.random() * (canvas.height - target.height);
    }

    // Reset star position if it goes out of bounds
    if (star.x > canvas.width) {
        star.x = 0;
        star.y = Math.random() * canvas.height;
        star.dy = 0;
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
