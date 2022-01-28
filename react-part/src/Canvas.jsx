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
            y: canvas.height / 2 - 50,
            w: 80,
            h: 10
        }

        const leftPaddle = {
            x: 10,
            y: canvas.height / 2 - 50,
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
            ball(ctx, context.canvas.width / 2, context.canvas.height / 2, 6)
        }

        const GameControll = () => 
        {
            if (Left_upPressed === true) 
            {
                leftPaddle.y -= 5
            }
            else if (Left_downPressed === true)
            {
                leftPaddle.y += 5
            }
            if ( Right_upPressed=== true)
            {
                rightPaddle.y -= 5
            }
            else if (Right_downPressed === true)
            {
                rightPaddle.y += 5
            }
        }

        const render = () => {
            draw(context)
            GameControll()
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        // keyhook
       

        // declare variables
        

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