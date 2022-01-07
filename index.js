var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

// console.log(width);
// console.log(height);
var LeftpaddleHeight = 75;
var LeftpaddleY = (height - LeftpaddleHeight) / 2;


var RightpaddleHeight = 75;
var RightpaddleY = (height - RightpaddleHeight) / 2;

function left_hand() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(10, LeftpaddleY, 10, 80);
    ctx.closePath();
}

function right_hand() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    var x1 = width - 20;
    ctx.fillRect(x1, RightpaddleY, 10, 80);
    // console.log(ctx.x;
    ctx.closePath();
}

function fixed_line() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect((width / 2), 0, 1, height);
    console.log(ctx.position);
    ctx.closePath();
}

var x = width / 2;
var y = height / 2;

var speed = 10;
var dx = 2;
var dy = -2;

var init_angle = 0;
var ballradius = 6;
function ball() {
    ctx.beginPath();
    ctx.arc(x, y, ballradius, init_angle, Math.PI * 2, true);// 20PI
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function miniball() {
    ctx.beginPath();
    // random color
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    // random x and y 
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);
    // var radius = ;
    ctx.arc(x, y, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function animate() {
    var i = 0;
    while (i < 10) {
        miniball();
        i++;
    }
}


var left_score = 0;
var right_score = 0;

function manage_ball() {


    if (y + dy < 0) {// if ball hits the top
        dy = -dy;
    }
    if (y + dy > canvas.height) {// if ball hits the bottom
        dy = -dy;
    }
    if (y + dy > canvas.height || y + dy < 0) { // if ball hits the top or bottom
        dy = -dy;
    }
    // check if ball hits the paddle
    if (x + dx > canvas.width - 20) {
        if (y > RightpaddleY && y < RightpaddleY + RightpaddleHeight) {
            // dy = -dy;
            dx = -dx;
            dx *= 1.5;
            if (dx >8) {
                dx /= 2;
            }
            // alert("Right Paddle");
        }
        else if (x + dx > canvas.width) {
            speed = 0;
            right_score++;
            x = width / 2;
            y = height / 2;
            dx = 2;
        }
    }
    if (x + dx < 20) {
        if (y > LeftpaddleY && y < LeftpaddleY + LeftpaddleHeight || x + dx < 0) {
            // dy = -dy;
            dx = -dx;
            dx *= 1.5;
            if (dx > 8) {
                dx = dx / 2;
            }
            // alert("Left Paddle");
        }
        else if (x + dx < 10) {
            left_score += 1;
            dx = 2;
            x = width / 2;
            y = height / 2;



        }
    }
}

var Left_UpPressed = false;
var Left_DownPressed = false;

var Right_UpPressed = false;
var Right_DownPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        Right_UpPressed = true;

    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        Right_DownPressed = true;

    }

    if (e.key == "w" || e.key == "KeyW") {
        Left_UpPressed = true;
    }
    else if (e.key == "s" || e.key == "KeyS") {
        Left_DownPressed = true;

    }
}

function keyUpHandler(e) {
    console.log(e.key);
    if (e.key == "Up" || e.key == "ArrowUp") {
        Right_UpPressed = false;

    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        Right_DownPressed = false;

    }
    if (e.key == "w" || e.key == "KeyW") {
        Left_UpPressed = false;
    }
    else if (e.key == "s" || e.key == "KeyS") {
        Left_DownPressed = false;

    }

    if (e.keyCode == 32) {
        pause = !pause;
    }

}

function key_hook() {
    if (Left_DownPressed) {
        LeftpaddleY += 4;
        if (LeftpaddleY + LeftpaddleHeight > canvas.height) {
            LeftpaddleY = canvas.height - LeftpaddleHeight;
        }
    }
    else if (Left_UpPressed) {
        LeftpaddleY -= 4;
        if (LeftpaddleY < 0) {
            LeftpaddleY = 0;
        }
    }

    if (Right_DownPressed) {
        RightpaddleY += 4;
        if (RightpaddleY + RightpaddleHeight > canvas.height) {
            RightpaddleY = canvas.height - RightpaddleHeight;
        }
    }
    else if (Right_UpPressed) {
        RightpaddleY -= 4;
        if (RightpaddleY < 0) {
            RightpaddleY = 0;
        }
    }

}



function score() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(right_score, 30, 30);

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(left_score, width - 30, 30);
}
var pause = false;

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fixed_line();
    left_hand();
    ball();
    right_hand();
    score();
    animate();
    manage_ball();// manage ball movement
    if (pause == false) {
        key_hook();
        x += dx;
        y += dy;
    }
}


setInterval(draw, speed);