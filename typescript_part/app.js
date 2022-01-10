class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.color = "rgb(44, 44, 84)";
        this.canvas.style.backgroundColor = this.color;
        this.Right_UpPressed = false;
        this.Right_DownPressed = false;
        this.Left_UpPressed = false;
        this.Left_DownPressed = false;
        this.Player1 = new Player(10, (this.canvas.height - 80) / 2, 10, 80, "white", this.ctx, this.canvas, 0);
        this.Player2 = new Player(this.canvas.width - 20, (this.canvas.height - 80) / 2, 10, 80, "white", this.ctx, this.canvas, 0);
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 6, "white", this.ctx, this.canvas);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        this.start();
    }
    keyDownHandler(e) {
        if (e.key == "Up" || e.key == "ArrowUp") {
            this.Right_UpPressed = true;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") {
            this.Right_DownPressed = true;
        }
        if (e.key == "w" || e.key == "KeyW") {
            this.Left_UpPressed = true;
        }
        else if (e.key == "s" || e.key == "KeyS") {
            this.Left_DownPressed = true;
        }
    }
    keyUpHandler(e) {
        if (e.key == "Up" || e.key == "ArrowUp") {
            this.Right_UpPressed = false;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") {
            this.Right_DownPressed = false;
        }
        if (e.key == "w" || e.key == "KeyW") {
            this.Left_UpPressed = false;
        }
        else if (e.key == "s" || e.key == "KeyS") {
            this.Left_DownPressed = false;
        }
    }
    ControleGame() {
        if (this.Left_DownPressed) {
            this.Player1.moveUp(4);
        }
        else if (this.Left_UpPressed) {
            this.Player1.moveDown(4);
        }
        if (this.Right_DownPressed) {
            this.Player2.moveUp(4);
        }
        else if (this.Right_UpPressed) {
            this.Player2.moveDown(4);
        }
    }
    start() {
        this.update();
    }
    update() {
        this.clear();
        this.draw();
        this.ControleGame();
        this.ball.move();
        requestAnimationFrame(() => this.update());
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    manage_ball() {
    }
    draw() {
        this.Player1.draw();
        this.Player2.draw();
        this.ball.draw();
    }
}
class Ball {
    constructor(x, y, radius, color, ctx, Canvas) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = 5;
        this.ctx = ctx;
        this.ballradius = radius;
        this.canvas = Canvas;
        this.dx = -2;
        this.dy = 2;
        this.draw();
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.y + this.dy < 0) { // if ball hits the top
            this.dy = -this.dy;
        }
        if (this.y + this.dy > this.canvas.height) { // if ball hits the bottom
            this.dy = -this.dy;
        }
        if (this.y + this.dy > this.canvas.height || this.y + this.dy < 0) { // if ball hits the top or bottom
            this.dy = -this.dy;
        }
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.ballradius, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.closePath();
    }
}
class Player {
    constructor(x, y, width, height, color, ctx, Canvas, score) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.Canvas = Canvas;
        this.ctx = ctx;
        this.score = score;
        this.draw();
    }
    get Height() {
        return this.height;
    }
    get Width() {
        return this.width;
    }
    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }
    get Score() {
        return this.score;
    }
    set Score(value) {
        this.score += value;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }
    moveUp(direction) {
        this.y += direction;
        if (this.Canvas.height < this.y + this.height) {
            this.y = this.Canvas.height - this.height;
        }
    }
    moveDown(direction) {
        this.y -= direction;
        if (this.y < 0) {
            this.y = 0;
        }
    }
}
var game = new Game();
console.log("Hello World");
