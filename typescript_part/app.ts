class Game
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    constructor()
    {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.start();
    }

    start()
    {
        this.update();
    }

    update()
    {
        this.clear();
        this.draw();
        requestAnimationFrame(() => this.update());
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    draw()
    {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    

}

var game = new Game();

console.log("Hello World");