var blockSize = 25;
var rows = 20;
var cols = 20;
var canvas;
var context;
var snakeX = blockSize*5;
var snakeY = blockSize*5;
var foodX = blockSize*10;
var foodY = blockSize*10;
var velocityX = 0;
var velocityY = 0;
var score = 0;
var scoreEl = document.querySelector("h3") // score text html tag\div
var gameOverTextEl = document.querySelector("h2") // Game Over text html tag\div
var gameOverTrigger = true // used to stop game over sound only!
var speed = 250; // in miliseconds for setinterval


// sound effects variables
var eatSound = new Audio ("eat_sfx.mp3")
var gameOverSound = new Audio("gameover_voice_sfx.mp3")


window.onload = function(){
    canvas = document.querySelector("canvas");
    canvas.width = rows*blockSize
    canvas.height = cols*blockSize
    canvas.style.backgroundColor = "black";

    context = canvas.getContext("2d")

    placeFood();
    document.addEventListener("keyup", changeDirection);
    
    setInterval(update, speed);
}


// main game working function
function update (){
    
    context.fillStyle = "yellowgreen"
    context.fillRect(0, 0, cols*blockSize, rows*blockSize)
    
    context.fillStyle = "black"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    context.fillStyle = "darkblue"
    snakeX += velocityX*blockSize
    snakeY += velocityY*blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    if (snakeX===foodX && snakeY===foodY){
        score += 1;
        scoreEl.innerText = `Score:${score}`
        eatSound.play()
        placeFood()
    }
    
    if (
        snakeX>490 ||
        snakeX<0 ||
        snakeY<0 ||
        snakeY>490
    ){
        gameOver()
        clearInterval()
    }

}


// moving snake with this function
function changeDirection (e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}


// spawn food on random locations
function placeFood (){
    foodX = Math.floor(Math.random()* cols)* blockSize;
    foodY = Math.floor(Math.random()* rows)* blockSize;
}


// game over function
function gameOver (){
    
    if (gameOverTrigger===true){
        gameOverSound.play();
        gameOverTrigger = false;
    }
    gameOverTextEl.innerText = "Game Over!"
    context.fillStyle = "darkred"
    context.fillRect(0, 0, cols*blockSize, rows*blockSize)

}
