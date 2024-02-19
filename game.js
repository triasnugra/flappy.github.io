// JavaScript for the game

let canvas;
let canvasContext;
let birdX = 50;
let birdY = 150;
let birdSpeedY = 0;
const GRAVITY = 0.5;
const JUMP = -8;

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
};

function drawEverything() {
    // Background
    canvasContext.fillStyle = '#87CEEB';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Bird
    canvasContext.fillStyle = '#FFA07A';
    canvasContext.fillRect(birdX, birdY, 30, 30);
}

function moveEverything() {
    birdSpeedY += GRAVITY;
    birdY += birdSpeedY;

    if (birdY > canvas.height) {
        birdY = canvas.height;
        birdSpeedY = 0;
    }

    if (birdY < 0) {
        birdY = 0;
        birdSpeedY = 0;
    }
}
