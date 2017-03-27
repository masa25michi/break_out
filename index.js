/***************************************************************
                     Global Variables
****************************************************************/
var canvas = null;
var canvasWidth = 0;
var canvasHeight = 0;
var context = null;
var paddleWidth = 120;
var paddleHeight = 10;
var paddlePositionX = 0;
var paddlePositionY = 0;
var paddle2PositionX = 0;
var paddle2PositionY = 0;
var ballCenterX = 0;
var ballCenterY = 0;
var ball2CenterX = 0;                       
var ball2CenterY = 0;
var ballRadius = 15;
var dx = 2;
var dy = -2;
var dx2 = -2;
var dy2 = 2;

var rightPressed = false;
var leftPressed = false;
var intervalId;
var timerId;

var bricks = [];
var brickColumn = 8;
var brickLayer = 4;
var brickWidth = 100;
var brickHeight = 20;
var brickPadding = 10;
var brickTop = 50;
var brickLeft = 50;
    
var lifeCount = 3;
var lifePositionX = 800;
var lifePositionY = 10;
var lifeWidth=200;
var lifeHeight=30;

var isTwoPaddles = false;
var isTwoBalls = false;
var level = 0;
var isBallOneAlive = true;
var isBallTwoAlive = false;

var scoreCount = 0;

var isPlayerReady = false;

/***************************************************************
             Button Function called from Event Handler
****************************************************************/
//Without 'Start Menue', everything should be display none
function onloadFunction() {
    document.getElementById("board").style.display = 'none';
    document.getElementById("gameover").style.display = 'none';
    document.getElementById("playStatus").style.display = 'none';
    document.getElementById("startMenu2FromPlay").style.display = 'none';
    document.getElementById("startMenu3FromLevel").style.display = 'none';
    document.getElementById("startMenu4FromPaddle").style.display = 'none';
    document.getElementById('levelGameFinish').style.display = 'none';
    document.getElementById('normalGameFinish').style.display = 'none';
    document.getElementById("helpMenu").style.display = 'none';


    levelsButtonFunction();
}

function playButtonFunction(){
    document.getElementById("startMenu").style.display = 'none';
    document.getElementById("startMenu2FromPlay").style.display = 'block';
}
function helpButtonFunction(){
    document.getElementById("startMenu").style.display = 'none';
    document.getElementById("container").style.display = 'none';
    document.getElementById("helpMenu").style.display = 'block';
}
function returnToStartFunction(){
    document.location.reload();
}
function levelButtonFunction(){
    document.getElementById("startMenu").style.display = 'none';
    document.getElementById("startMenu3FromLevel").style.display = 'block';
}
function onePaddleButtonFunction(){
    document.getElementById("startMenu2FromPlay").style.display = 'none';
    document.getElementById("startMenu4FromPaddle").style.display = 'block';
}
function twoPaddleButtonFunction(){
    document.getElementById("startMenu2FromPlay").style.display = 'none';
    document.getElementById("startMenu4FromPaddle").style.display = 'block';
    isTwoPaddles = true;
}
function startNormalGameFunction(){
    document.getElementById("startMenu4FromPaddle").style.display = 'none';
    level = 0;
    startGame();
}
function levellistFunction(){
    document.getElementById("startMenu4FromPaddle").style.display = 'none';
    document.getElementById("startMenu3FromLevel").style.display = 'block';
}
function levelupFunction(){
    document.getElementById("startMenu4FromPaddle").style.display = 'none';
    level = 1;
    startGame();
}
function levelsButtonFunction(){
    var buttons = document.getElementsByClassName("levelButton");
    var buttonsCount = buttons.length;
    for (var i = 0; i < buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            document.getElementById("startMenu3FromLevel").style.display = 'none';
            level = parseInt(this.innerHTML[6]);
            if(level == 6){
                isTwoBalls = true;
                isBallTwoAlive =true;
            }
            startGame();
        }
    }
}
function restartOnclickFunction(){
    document.location.reload();
}
function closeFunction(){
    window.close();
}
function continueFunction(){
    document.getElementById("levelGameFinish").style.display = 'none';
    level = level+1;
    startGame();
}
function stopFunction(){
    document.getElementById("gameover").style.display = 'block';
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    clearInterval(intervalId);
    clearInterval(timerId);
}

/*************************************************************
              Functions to start game
**************************************************************/

function startGame(){
    //Enable keydown and keyup 
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    document.getElementById("board").style.display = 'block';
    document.getElementById("playStatus").style.display = 'block';
    document.getElementById('levelcountWords').innerHTML = '<b>level: '+level+'</b>';
    canvas = document.getElementById("board");

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    context = canvas.getContext("2d");
    paddlePositionX = (canvasWidth/2)-50;
    paddlePositionY = canvasHeight - paddleHeight;
    paddle2PositionX = (canvasWidth/2)-150;
    paddle2PositionY = canvasHeight - paddleHeight;
    ballCenterX = canvasWidth /2;
    ballCenterY = canvasHeight -40;
    ball2CenterX = 700; 
    ball2CenterY = 260;

    //connect with level.js functions and get variables 
    bricks = getBricks(level);
    brickColumn = getBrickColumn();
    brickLayer = getBrickLayer();
    brickWidth = getBrickWidth();
    brickHeight = getBrickHeight();
    brickPadding = getBrickPadding();
    brickTop = getbrickTop();
    brickLeft = getbrickLeft();

    scoreCount = 0;

    drawLifeImage();

    var fiveMinutes = 60 * 5, display = document.querySelector('#timer');
    startTimer(fiveMinutes, display);

    intervalId = setInterval(draw, 10);

}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerId = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 
        1000
    );
}

function runClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = addzero(h);  m = addzero(m); s = addzero(s);
    document.getElementById('timer').innerHTML = h +":"+ m +":"+ s;
    t = setTimeout('runClock()', 1000);
}

function addzero(i) {   
    if (i < 10) { 
        i = "0" + i;  
    }
    return i; 
}

/*************************************************************
              Functions to draw the game
**************************************************************/

function draw(){
    if(checkBricksStatus()==true){
        if(level!=0 && level!=6){
            document.getElementById('levelGameFinish').style.display = 'block';
        }else{
            document.getElementById('normalGameFinish').style.display = 'block';
        }
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        document.removeEventListener("keydown", keyDownHandler);
        document.removeEventListener("keyup", keyUpHandler);
        clearInterval(intervalId);
        clearInterval(timerId);
    }
    //clear the canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    //Check two balls collistion with bricks or walls 
    if(isBallOneAlive) {
        if(isTwoPaddles){
            collisionDetection(true, true);
            collisionDetection(true, false);
        }else{
            collisionDetection(true, true);
        }
    }
    if(isTwoBalls&&isBallTwoAlive) {
        if(isTwoPaddles){
            collisionDetection(false, true);
            collisionDetection(false, false);
        }else{
            collisionDetection(false, true);
        }
    }

    //check two balls collide each 
    circleColisionDetection();
    drawPaddle("Cyan", true);
    if(isTwoPaddles==true){
        drawPaddle("Aquamarine", false);
    }

    drawBall(true);
    if(isTwoBalls){
        drawBall(false);
    }
    drawBricks();
    
    ballCenterX = ballCenterX+dx;
    ballCenterY = ballCenterY+dy;
    ball2CenterX = ball2CenterX+dx2;
    ball2CenterY = ball2CenterY+dy2;

    if(rightPressed && (paddlePositionX+paddleWidth<=canvasWidth)) {
        paddlePositionX = paddlePositionX+9;
    }
    else if(leftPressed &&(paddlePositionX>=0)) {
        paddlePositionX = paddlePositionX-9;
    }
}

function drawBricks() {
    for(var r=0; r<brickLayer; r++) {
        var brickY = r*(brickHeight +brickPadding)+brickTop;
        for(var c=0; c<brickColumn; c++) {
            var brickX = c*(brickWidth + brickPadding)+brickLeft;

            if(bricks[r][c].isHit!=1){
                bricks[r][c].x = brickX;
                bricks[r][c].y = brickY;
                bricks[r][c].leftDown_corner_x = brickX;
                bricks[r][c].leftDown_corner_y = brickY+brickHeight;
                bricks[r][c].leftUp_corner_x = brickX;
                bricks[r][c].leftUp_corner_y = brickY
                bricks[r][c].rightDown_corner_x = brickX+brickWidth;
                bricks[r][c].rightDown_corner_y = brickY+brickHeight;
                bricks[r][c].rightUp_corner_x = brickX+brickWidth;
                bricks[r][c].rightUp_corner_y = brickY

                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#0095DD";
                context.fill();
                context.closePath();
            }
        }
    }
}

function drawPaddle(color, isPaddle1){
    context.beginPath();
    if(isPaddle1)
        context.rect(paddlePositionX, paddlePositionY, paddleWidth, paddleHeight);
    else 
        context.rect(paddle2PositionX, paddle2PositionY, paddleWidth, paddleHeight);
    
    context.fillStyle =color;
    context.fill();
    context.closePath();
}

function drawBall(isBallOne){
    if(!isBallOne&&isTwoBalls&&isBallTwoAlive){
        context.beginPath();
        context.arc(ball2CenterX, ball2CenterY, ballRadius, 0, 2 * Math.PI, false);
        context.fillStyle = "yellow";
        context.fill();
        context.stroke();
    }else if(isBallOne&&isBallOneAlive){
        context.beginPath();
        context.arc(ballCenterX, ballCenterY, ballRadius, 0, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
        context.stroke();
        // console.log("X: "+ballCenterX+", Y: "+ballCenterY);
    }
}

function drawLifeImage(){
    var images = "";
    for(var i=0;i<lifeCount;i++){
        images+="<img src='heart.png' alt='heart image'/>";
    }
    images+="&nbsp";
    document.getElementById('lifeImage').innerHTML = images;
}

function lifeDetection(){
    if(!isBallOneAlive && !isBallTwoAlive){
        lifeCount--;
        drawLifeImage();
        isBallOneAlive = true;
        if(isTwoBalls) isBallTwoAlive = true;
        ballCenterX = canvasWidth /2;
        ballCenterY = canvasHeight -40;
        ball2CenterX = canvasWidth /2-30;
        ball2CenterY = canvasHeight -60;
        dx = 2;
        dy = -2;
        dx2 = -2;
        dy2 = -2;
    }

    if(lifeCount==0){
        drawLifeImage();
        document.removeEventListener("keydown", keyDownHandler);
        document.removeEventListener("keyup", keyUpHandler);
        document.getElementById("gameover").style.display = 'block';
        isBallOneAlive = false;
        isBallTwoAlive = false;
        clearInterval(intervalId);
        clearInterval(timerId);
    }

}
function checkBricksStatus(){
    for(var r = 0; r < brickLayer; r++){
        for(var c = 0; c<brickColumn; c++){
            if(bricks[r][c].isHit!=1){
                return false;
            }
        }
    }
    return true;
}
function changeDirection(isdX, isBallOne){
    if(isBallOne){
        if(isdX){
            dx = -dx;
        }else{
            dy = -dy;
        }
    }else{
        if(isdX){
            dx2 = -dx2;

        }else{
            dy2 = -dy2;
            
        }
    }

}
function circleColisionDetection(){
    if(isTwoBalls&&(Math.sqrt( ( ball2CenterX- ballCenterX ) * ( ball2CenterX-ballCenterX )  + ( ball2CenterY-ballCenterY ) * ( ball2CenterY-ballCenterY ) ) <= ( ballRadius*2 ))){
        dx=-dx;
        dx2 = -dx2;
        // console.log("OKOK");
    }
}
function IsIntersected(ballX, ballY, rectangleX, rectangleY)
{   
    var rectangleCenter = {
        x: (rectangleX + brickWidth/2),
        y: (rectangleY + brickHeight/2),
        w: (brickWidth/2),
        h: (brickHeight/2)
    };

    var distX = Math.abs(ballX - rectangleCenter.x);
    var distY = Math.abs(ballY - rectangleCenter.y);

    if (distX > (rectangleCenter.w + ballRadius)) { return false; }
    if (distY > (rectangleCenter.h + ballRadius)) { return false; }

    if (distX <= (rectangleCenter.w)) { return true; } 
    if (distY <= (rectangleCenter.h)) { return true; }

    var dx = distX-rectangleCenter.w;
    var dy = distY-rectangleCenter.h;

    return (dx*dx+dy*dy<=(ballRadius*ballRadius));
}

function collisionDetection(isBallOne, isPaddle1){
    if(isPaddle1){
        var tempPaddlePositionX = paddlePositionX;
        var tempPaddlePositionY = paddlePositionY;
    }
    else{
        var tempPaddlePositionX = paddle2PositionX;
        var tempPaddlePositionY = paddle2PositionY;
    }

    if (!isBallOne&&isBallTwoAlive){
        var y = ball2CenterY+dy2;
        var x = ball2CenterX+dx2;
        
        var tempBallCenterX = ball2CenterX;
        var tempBallCenterY = ball2CenterY;
    }else if(isBallOne&&isBallOneAlive){
        var y = ballCenterY+dy;
        var x = ballCenterX+dx;
        var tempBallCenterX = ballCenterX;
        var tempBallCenterY = ballCenterY;
    }
    
    if((tempBallCenterX >= tempPaddlePositionX) && (tempBallCenterX<=(tempPaddlePositionX+paddleWidth)) && (y+ballRadius) >=(tempPaddlePositionY)){
        // dy = -dy;
        changeDirection(false, isBallOne);return;
    }else if( Math.sqrt((tempPaddlePositionX+4-x)*(tempPaddlePositionX+4-x) + (tempPaddlePositionY-y)*(tempPaddlePositionY-y)) < ballRadius ){
        // dx = -dx;
        changeDirection(true, isBallOne);return;
        // dy = -dy;
        changeDirection(false, isBallOne);return;
    }else if( Math.sqrt((tempPaddlePositionX+4+paddleWidth-x)*(tempPaddlePositionX+paddleWidth+4-x) + (tempPaddlePositionY-y)*(tempPaddlePositionY-y)) < ballRadius ){
        // dx = -dx;
        changeDirection(true, isBallOne);return;
        // dy = -dy;
        changeDirection(false, isBallOne);return;
    }
    //if ball is touched up wall
    if((y-ballRadius) <= 0){
        // dy = -dy;
        changeDirection(false, isBallOne);
        return;
    }else if((y) >= canvasHeight){//if ball is touched the bottom of wall
        if(isBallOne){
            isBallOneAlive = false;
        }else{
            isBallTwoAlive = false;
        }
        lifeDetection();
        return;
    }
    if(x >= canvasWidth || x <= ballRadius){
        // dx = -dx;
        changeDirection(true, isBallOne);
        return;
    }
    for(var r = 0; r < brickLayer; r++){
        for(var c = 0; c<brickColumn; c++){
                var b = bricks[r][c];
                if(b.isHit != 1) {
                    if(IsIntersected(tempBallCenterX, tempBallCenterY, b.x, b.y)==true){
                        bricks[r][c].isHit = 1;
                        scoreCount++;
                        changeDirection(false, isBallOne);return;
                    }
                }
            }
        }
    document.getElementById("score").innerHTML = "Score: "+scoreCount;return;
}

function keyDownHandler(e){
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    if(isTwoPaddles){
        console.log(canvas.getBoundingClientRect().left);
        var relativeX = e.clientX-canvas.getBoundingClientRect().left;
        if(relativeX> 0 && relativeX < canvas.width) {
            paddle2PositionX = relativeX - paddleWidth/2;
        }
    }
}
