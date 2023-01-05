// creating snakeboard
var blockSize = 25;
var rows = 20; //total row number
var cols = 20; //total column number
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//velocity needed for snake to move
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food 
var foodX 
var foodY 

// A variable of gameover is needed so the player knows when they lost the game and needs to restart
var gameOver = false;

 
//window.onload used so the board can load once the screen loads 
window.onload = function () {
    // Set board height and width
    board = document.getElementById("Snakeboard");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the snakeboard
 
    placeFood();
    document.addEventListener("keyup", changeDirection); //needed for snake to move
    update(); //this occurs on to the snakeboard 
    setInterval(update, 1000/10); //every 10 seconds, it runs the update function
}

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0,0, board.width, board.height);

  context.fillStyle = "red"; // color of the food 
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) { // 
    snakeBody.push([foodX, foodY])
    placeFood(); // needed for snake to consume food 
  }

  //allows snakebody to become longer after it consumes its food and follow the snake head 
  for (let i = snakeBody.length-1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime"; //color of snake 
  snakeX += velocityX * blockSize; //allows snake to move over to each square unit instead of moving by 1 pixel only
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
  context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
// placing "game over" condition when the snake goes out of bounds from the board
  if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
    gameOver = true;
    alert("Game Over!");
  }
//placing game over condition when snake head bumps into its own body 
  for (let i = 0; i <snakeBody.length; i++) {
    if (snakeX == snakeBody[1][0] && snakeY ==snakeBody[1][1]) {
      gameOver = true;
      alert("Game Over!");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY !=1) { // !=1 (not equal to 1) needed so snake can not go in same direction as it was previously moving
    velocityX = 0; //for snake to move up
    velocityY = -1;//for snake to move up 
  }
  else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0; //for snake to move down
    velocityY = 1;//for snake to move down 
  }
  else if (e.code == "ArrowLeft" && velocityX !=1) {
    velocityX = -1; //for snake to move left 
    velocityY = 0;//for snake to move left
  }
  else if (e.code == "ArrowRight" && velocityX !=-1) {
    velocityX = 1; //for snake to move right
    velocityY = 0;//for snake to move right
  }
}

//function to randomize food placement on snakeboard
function placeFood() {
  foodX=Math.floor(Math.random() * cols) * blockSize; 
  foodY = Math.floor(Math.random() * rows) * blockSize;
}