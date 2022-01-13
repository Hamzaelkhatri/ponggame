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
        this.Pause = false;
        /// set Bar in the middle of the screen
        this.Bar = new Player(this.width / 2 - 5, this.height / 2 - 80, 10, 80, "white", this.ctx, this.canvas, 0, "paddle.png");
        this.Player1 = new Player(10, (this.canvas.height - 80) / 2, 10, 80, "white", this.ctx, this.canvas, 0, "paddle.png");
        this.Player2 = new Player(this.canvas.width - 20, (this.canvas.height - 80) / 2, 10, 80, "white", this.ctx, this.canvas, 0, "paddle.png");
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 6, "white", this.ctx, this.canvas, this.Player1, this.Player2);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        this.start();
    }
    show_score() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.Player1.Score.toString(), this.canvas.width / 2 - 50, 20);
        this.ctx.fillText(this.Player2.Score.toString(), this.canvas.width / 2 + 50, 20);
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
        if (e.key == "p" || e.key == "KeyP" || e.key == "P" || e.key == " " || e.key == "Space") {
            this.Pause = !this.Pause;
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
    random_bar() {
        // this.ball.bot(this.Bar);
    }
    update() {
        this.clear();
        this.show_score(); // show score
        this.draw();
        if (!this.Pause) {
            this.ControleGame();
            this.ball.move();
            this.ball.collision(this.Player1, this.Player2);
            this.ball.bot(this.Player1);
        }
        else
            this.paused();
        // this.bar_y += (Math.floor(Math.random() * 40)) - 40;
        // if (this.bar_y > this.canvas.height - 80)
        //     this.bar_y = this.canvas.height - 80;
        // if (this.bar_y < 0)
        //     this.bar_y = 0;
        requestAnimationFrame(() => this.update());
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    center_line() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.canvas.width / 2, 0, 2, this.canvas.height);
    }
    paused() {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("PAUSE", this.canvas.width / 2 - 50, this.canvas.height / 2);
    }
    draw() {
        if (!this.Pause) {
            this.center_line();
            this.random_bar();
        }
        this.Player1.draw();
        this.Player2.draw();
        this.Bar.draw();
        this.ball.draw();
    }
}
class Ball {
    constructor(x, y, radius, color, ctx, Canvas, Player1, Player2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "rgb(" + Math.floor(Math.random() * 255 + 80) + "," + Math.floor(Math.random() * 255 + 80) + "," + 50 + Math.floor(Math.random() * 255 + 80) + ")";
        this.speed = 5;
        this.ctx = ctx;
        ;
        this.ballradius = radius;
        this.canvas = Canvas;
        this.dx = -this.speed;
        this.dy = this.speed;
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.draw();
    }
    goal_sound() {
        var sound = new Audio("goal_effect.wav");
        sound.play();
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.y + this.dy < 0) { // if ball hits the bottom
            this.dy = -this.dy;
            console.log("hit top");
        }
        if (this.y + this.dy > this.canvas.height) { // if ball hits the top
            this.dy = -this.dy;
            console.log("hit bottom");
        }
        if (this.y + this.dy > this.canvas.height || this.y + this.dy < 0) { // if ball hits the top or bottom
            this.dy = -this.dy;
        }
        if (this.x + this.dx < 0) { // if ball hits the left
            // this.dx = -this.dx;
            this.x = this.canvas.width / 2;
            this.y = this.canvas.height / 2;
            this.dx = -this.dx;
            this.Player2.score++;
            this.goal_sound();
        }
        if (this.x + this.dx > this.canvas.width) // if ball hits the right
         {
            // this.dx = -this.dx;
            this.x = this.canvas.width / 2;
            this.y = this.canvas.height / 2;
            this.dx = -this.dx;
            this.Player1.score++;
            this.goal_sound();
        }
    }
    collision(Player1, Player2) {
        if (this.x + this.dx < this.Player1.x + this.Player1.width && this.x + this.dx > this.Player1.x && this.y + this.dy > this.Player1.y && this.y + this.dy < this.Player1.y + this.Player1.height) {
            this.dx = -this.dx;
            // augmente la vitesse de la balle
            this.speed += 0.5;
        }
        if (this.x + this.dx < this.Player2.x + this.Player2.width && this.x + this.dx > this.Player2.x && this.y + this.dy > this.Player2.y && this.y + this.dy < this.Player2.y + this.Player2.height) {
            this.dx = -this.dx;
            this.speed += 0.5;
        }
        Player2.paddle_sound();
    }
    calculate_coordinates_of_ball_on_paddle(Player) {
        var paddle_center = Player.y + Player.height / 2;
        var ball_center = this.y + this.radius;
        var distance = paddle_center - ball_center;
        var y_coordinate_of_ball_on_paddle = distance / Player.height * this.canvas.height;
        return y_coordinate_of_ball_on_paddle;
    }
    bot(p) {
        var y_coordinate_of_ball_on_paddle = this.calculate_coordinates_of_ball_on_paddle(p);
        if (y_coordinate_of_ball_on_paddle < this.y + this.radius) {
            p.moveUp(8);
        }
        else if (y_coordinate_of_ball_on_paddle > this.y + this.radius) {
            p.moveDown(8);
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
    constructor(x, y, width, height, color, ctx, Canvas, score, avatar) {
        this.x = x;
        this.y = y;
        this.color = "rgb(" + Math.floor(Math.random() * 255 + 80) + "," + Math.floor(Math.random() * 255 + 80) + "," + 50 + Math.floor(Math.random() * 255 + 80) + ")";
        this.width = width;
        this.height = height;
        this.Canvas = Canvas;
        this.ctx = ctx;
        this.score = score;
        this.sound = document.getElementById("paddle_effect");
        this.avatar = avatar;
        this.draw();
    }
    paddle_sound() {
        // this.sound.play();
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
        var img = new Image();
        img.src = this.avatar;
        // this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
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
