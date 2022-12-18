// Variables 
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');

const blockWidth = 100;
const blockHeight = 20;

const ballDiameter = 20
const boardWidth = 560;

const boardHeight = 300;

let xDirection = 2
let yDirection = 2
let score = 0;

const userStart = [230,10]
let currentPosition = userStart;

const ballStart = [270,40]
let ballCurrentPosition = ballStart;

let timerId;


// create Block
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis+blockHeight]
    }
}

// All Blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
    new Block(10,180),
    new Block(120,180),
    new Block(230,180),
    new Block(340,180),
    new Block(450,180),
]

//console.log(blocks[0])


//Drow Block
function addBlocks(){
    for (let i=0; i<blocks.length;i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left= blocks[i].bottomLeft[0]+'px'
        block.style.bottom= blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block);
    }
}
addBlocks();

//Add User
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drowUser();

// Add Ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drowBall();

//Mover user
function moveUser(e){
    switch(e.key){
        case'ArrowLeft':
          if(currentPosition[0]>0){
             currentPosition[0]-= 10
              drowUser()
            }
           break;
        case 'ArrowRight':
          if(currentPosition[0] < boardWidth - blockWidth){
             currentPosition[0] += 10
              drowUser()
            }
           break;
    }
}
document.addEventListener('keydown', moveUser)

//Drow user
function drowUser(){
    user.style.left = currentPosition[0]+'px';
    user.style.bottom = currentPosition[1]+'px';
}

//Drow a ball
function drowBall(){
    ball.style.left = ballCurrentPosition[0]+'px';
    ball.style.bottom = ballCurrentPosition[1]+'px';
}

// Move Ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drowBall();
    checkForCollisions()
}
timerId = setInterval(moveBall,20)

//Collisions
function checkForCollisions(){
    // Block Collision 
    for (let i=0; i<blocks.length; i++) {
        if
        (
          (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
          ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score ++
            scoreDisplay.innerHTML = score;

            //Check for winning 
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You won'
                clearInterval(timerId)
                document.removeEventListener('keydown',moveUser)
            }
        }
    }
    
    //Check for wall collision
    if (
         ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
         ballCurrentPosition[1] >= (boardHeight - ballDiameter)|| 
         ballCurrentPosition[0] <= 0
        ) {
        changeDirection();
    }

    //user collision
    if
    (
      (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
      (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
    ) {
        changeDirection();
    }

    //Game over
    if (ballCurrentPosition[1]===0){
        clearInterval(timerId)
        scoreDisplay.innerHTML= "You Lose";
        document.removeEventListener('keydown', moveUser)
    }
}

// Change ball direction
function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2){
        xDirection = -2;
        return
    }
    if (xDirection === -2 && yDirection === -2){
        yDirection = 2;
        return
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return
    }
}
