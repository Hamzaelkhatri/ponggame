var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.start();
    }
    Game.prototype.start = function () {
        this.update();
    };
    Game.prototype.update = function () {
        var _this = this;
        this.clear();
        this.draw();
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    Game.prototype.draw = function () {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.width, this.height);
    };
    return Game;
}());
var game = new Game();
console.log("Hello World");
