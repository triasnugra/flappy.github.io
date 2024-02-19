let canvas;
let canvasContext;
let birdX = 50;
let birdY = 150;
let birdSpeedY = 0;
let score = 0;
let pipe = [];
const GRAVITY = 0.5;
const JUMP = -8;
const PIPE_WIDTH = 50;
const PIPE_GAP = 120;
const PIPE_SPACING = 200;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000/30);

    canvas.addEventListener('click', function() {
        birdSpeedY = JUMP;
    });

    // Generate initial pipes
    for (let i = 0; i < 3; i++) {
        pipe.push({
            x: canvas.width + i * PIPE_SPACING,
            y: Math.floor(Math.random() * (canvas.height - PIPE_GAP)),
            width: PIPE_WIDTH,
            height: canvas.height,
            passed: false
        });
    }
};

function drawEverything() {
    // Background
    canvasContext.fillStyle = '#87CEEB';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Bird
    canvasContext.fillStyle = '#FFA07A';
    canvasContext.fillRect(birdX, birdY, 30, 30);

    // Pipes
    canvasContext.fillStyle = '#008000';
    for (let i = 0; i < pipe.length; i++) {
        canvasContext.fillRect(pipe[i].x, 0, pipe[i].width, pipe[i].y);
        canvasContext.fillRect(pipe[i].x, pipe[i].y + PIPE_GAP, pipe[i].width, canvas.height);
    }

    // Score
    canvasContext.fillStyle = '#000';
    canvasContext.font = '30px Arial';
    canvasContext.fillText('Score: ' + score, 10, 30);
}

function moveEverything() {
    birdSpeedY += GRAVITY;
    birdY += birdSpeedY;

    // Move pipes
    for (let i = 0; i < pipe.length; i++) {
        pipe[i].x -= 2;

        // Check collision
        if (birdX + 30 >= pipe[i].x && birdX <= pipe[i].x + PIPE_WIDTH) {
            if (birdY <= pipe[i].y || birdY + 30 >= pipe[i].y + PIPE_GAP) {
                gameOver();
            }
        }

        // Check if pipe passed
        if (pipe[i].x + PIPE_WIDTH < birdX && !pipe[i].passed) {
            pipe[i].passed = true;
            score++;
        }

        // Remove pipes that are out of screen
        if (pipe[i].x + PIPE_WIDTH < 0) {
            pipe.shift();
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * (canvas.height - PIPE_GAP)),
                width: PIPE_WIDTH,
                height: canvas.height,
                passed: false
            });
        }
    }

    if (birdY > canvas.height || birdY < 0) {
        gameOver();
    }
}

function gameOver() {
    alert('Game Over! Your score: ' + score);
    location.reload(); // Reload the page to restart the game
}
