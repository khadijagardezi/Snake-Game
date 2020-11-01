const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32;

//load the images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load the audio
const dead = new Audio();
dead.src = '/audio/dead.mp3'
const eat = new Audio();
eat.src = "/audio/eat.mp3"
const  up = new Audio();
up.src = "/audio/up.mp3"
const left = new Audio();
left.src = "/audio/left.mp3"
const down = new Audio();
down.src = "/audio/down.mp3"
const right = new Audio();
right.src = "/audio/right.mp3"



//create the snake
let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
}
//create the food
let food = {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box
}

// creating score
let score = 0;
// controlling the snake 
let d;
document.addEventListener('keydown', direction);
// left 37, up 38, right 39, down 40.
function direction(event) {
	if (event.keyCode == 37 && d != "RIGHT") {
		d = 'LEFT';
		left.play();
	} else if (event.keyCode == 38 && d !="DOWN") {
		d = 'UP';
		up.play();
	} else if (event.keyCode == 39 && d !="LEFT") {
		d = 'RIGHT';
		right.play();
	} else if (event.keyCode == 40 && d !="UP") {
		d = 'DOWN';
		down.play();
	}
}
function collision(head, array) {
	// body
	for(let i =0; i< array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
} 


function draw() {
	ctx.drawImage(ground, 0, 0);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i == 0) ? 'blue' : 'white';
		ctx.fillRect(snake[i].x, snake[i].y, box, box)
		ctx.strokeStyle = 'white';
		ctx.strokeRect(snake[i].x, snake[i].y, box, box)
	}
	ctx.drawImage(foodImg, food.x, food.y)

	// old head position
	let snakeX = snake[0].x; 
	let snakeY = snake[0].y; 
	// which Direction
	if(d== "LEFT") snakeX -=box;
	if(d== "UP") snakeY -=box;
	if(d== "RIGHT") snakeX +=box;
	if(d== "DOWN") snakeY +=box;
// if snake eats apple
if(snakeX == food.x && snakeY == food.y){
	score++;
	eat.play();
	food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box
	}
} else {
	snake.pop();
}
	let newHead = {
		x : snakeX,
		y : snakeY
	}
	// Game over 
if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake))
{
clearInterval(game);
dead.play();
alert('GAMEEE OVERRRRR');
}
	snake.unshift(newHead);
	//scores 
	ctx.fillStyle ='white';
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2* box, 1.6* box);
} 


//call draw function every 100 ms
let game = setInterval(draw, 200);