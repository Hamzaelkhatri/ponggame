import React, { useRef, useEffect } from 'react'


const Canvas = props => {

    const canvasRef = useRef(null)
    let frameCount = 10
    let animationFrameId
    let Right_downPressed = false
    let Right_upPressed = false
    let Left_downPressed = false
    let Left_upPressed = false
    let Pause = false

    const padlle = (ctx, x, y, h, w) => {
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.rect(x, y, h, w)
        ctx.fill()
        ctx.closePath()
    }

    const ball = (ctx, x, y, r) => {
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.closePath()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const rightPaddle = {
            x: canvas.width - 20,
            y: (canvas.height - 80) / 2,
            w: 80,
            h: 10
        }

        const leftPaddle = {
            x: 10,
            y: (canvas.height - 80) / 2,
            w: 80,
            h: 10
        }
        
        //Our first draw
        const draw = (ctx) => 
        {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            context.fillStyle = '#000000'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            padlle(ctx, rightPaddle.x, rightPaddle.y, rightPaddle.h, rightPaddle.w)
            padlle(ctx, leftPaddle.x, leftPaddle.y, leftPaddle.h, leftPaddle.w)

       
            // ball(ctx, context.canvas.width / 2, context.canvas.height / 2, 6)
        }
        
        let width = context.canvas.width
        let height = context.canvas.height
        let x = context.canvas.width / 2
        let y = context.canvas.height / 2
        let dx = 2
        let dy = -2
        let RightpaddleHeight = 80
        let LeftpaddleHeight =80
        let RightpaddleY = (height -  RightpaddleHeight) / 2
        let LeftpaddleY =  (height -  LeftpaddleHeight) / 2
        let speed = 1
        let right_score = 0
        let left_score = 0        

        const controleBall = (ctx) => 
        {
           
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
                    // dx *= 1.1;
                    // if (dx >18) {
                    //     dx = 2;
                    // }
                    // alert("Right Paddle");
                }
                else if (x + dx > canvas.width) {
                    speed = 0;
                    right_score++;
                    x = width / 2;
                    y = height / 2;
                    dx = -dx;
                }
            }
            if (x + dx < 20) {
                if (y > LeftpaddleY && y < LeftpaddleY + LeftpaddleHeight || x + dx < 0) {
                    // dy = -dy;
                    dx = -dx;
                    // dx *= 1.1;
                    // if (dx > 18) {
                    //     dx = 2;
                        
                    // }
                    // alert("Left Paddle");
                }
                else if (x + dx < 10) {
                    left_score += 1;
                    dx = -dx;
                    x = width / 2;
                    y = height / 2;
                }
            }
           
        }

        const GameControll = () => 
        {
            if (Left_upPressed === true) 
            {
                leftPaddle.y -= 5
                if(leftPaddle.y < 0)
                {
                    leftPaddle.y = 0
                }
            }
            else if (Left_downPressed === true)
            {
                leftPaddle.y += 5
                if(leftPaddle.y > canvas.height - leftPaddle.h - 70) 
                {
                    leftPaddle.y = canvas.height - leftPaddle.h - 70
                }
            }
            if ( Right_upPressed=== true)
            {
                rightPaddle.y -= 5
                if(rightPaddle.y < 0)
                {
                    rightPaddle.y = 0
                }
            }
            else if (Right_downPressed === true)
            {
                rightPaddle.y += 5
                if(rightPaddle.y > canvas.height - rightPaddle.h - 70)
                {
                    rightPaddle.y = canvas.height - rightPaddle.h - 70
                }
            }
        }

        const render = () => {
            draw(context)
            controleBall(context)
            ball(context, x, y, 6)
            GameControll()
            x += dx;
            y += dy;
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        const keydownHandler = (e) => {
            if (e.key === "Up" || e.key === "ArrowUp") {
                Right_upPressed = true
            }
            else if (e.key === "Down" || e.key === "ArrowDown") {
                Right_downPressed = true
            }
    
            if (e.key === "w" || e.key === "KeyW") {
                Left_upPressed = true
            }
            else if (e.key === "s" || e.key === "KeyS") {
                Left_downPressed = true
            }
            if (e.key === "p" || e.key === "KeyP" || e.key === "P" || e.key === " " || e.key === "Space") {
                Pause = !Pause
            }
        }

        const keyupHandler = (e) => {
            if (e.key === "Up" || e.key === "ArrowUp") {
                Right_upPressed = false
            }
            else if (e.key === "Down" || e.key === "ArrowDown") {
                Right_downPressed = false
            }
            if (e.key === "w" || e.key === "KeyW") {
                Left_upPressed = false
            }
            else if (e.key === "s" || e.key === "KeyS") {
                Left_downPressed = false
            }
        }

       

        window.addEventListener('keydown', keydownHandler)
        window.addEventListener('keyup', keyupHandler)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={canvasRef}  {...props} width={800} height={400} />
}

export default Canvas