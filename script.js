const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const bucketWidth = 60;
const bucketHeight = 60;
let bucket_x = 100;
const bucket_y = canvas.height - bucketHeight;
const BucketImg = new Image();
BucketImg.src = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/11199/bucket-fish-clipart-xl.png";

const fishWidth = 40;
const fishHeight = 40;
let fish_x = Math.random() * (canvas.width - fishWidth);
let fish_y = -fishHeight;
const FishImg = new Image();
FishImg.src = "https://media.voog.com/0000/0046/6916/photos/ahven.png";

let score = 0;
let timeLeft = 30;
let gameRunning = true;
const fishSpeed = 4;
let frameInterval;
let timerInterval;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && bucket_x > 0) bucket_x -= 10;
    if (e.key === "ArrowRight" && bucket_x + bucketWidth < canvas.width) bucket_x += 10;
});

canvas.addEventListener("click", () => {
    if (!gameRunning) restartGame();
});

function isTouching() {
    return !(bucket_x > fish_x + fishWidth ||
             bucket_x + bucketWidth < fish_x ||
             bucket_y > fish_y + fishHeight ||
             bucket_y + bucketHeight < fish_y);
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 10, 25);
    ctx.textAlign = "right";
    ctx.fillText("Laiks: " + timeLeft, canvas.width - 10, 25);

    ctx.drawImage(BucketImg, bucket_x, bucket_y, bucketWidth, bucketHeight);
    ctx.drawImage(FishImg, fish_x, fish_y, fishWidth, fishHeight);

    fish_y += fishSpeed;
    if (fish_y > canvas.height) {
        fish_y = -fishHeight;
        fish_x = Math.random() * (canvas.width - fishWidth);
    }

    if (isTouching()) {
        score++;
        fish_y = -fishHeight;
        fish_x = Math.random() * (canvas.width - fishWidth);
    }
}

function startGame() {
    frameInterval = setInterval(draw, 25);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(frameInterval);
            gameRunning = false;

            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Spēle beigusies! Punkti: " + score, canvas.width / 2, canvas.height / 2 - 5);
            ctx.fillText("Klikšķini, lai sāktu no jauna", canvas.width / 2, canvas.height / 2 + 15);
        }
    }, 1000);
}

function restartGame() {
    score = 0;
    timeLeft = 30;
    fish_x = Math.random() * (canvas.width - fishWidth);
    fish_y = -fishHeight;
    bucket_x = 100;
    gameRunning = true;
    startGame();
}

startGame();