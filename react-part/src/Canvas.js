import React, { useRef, useEffect } from 'react'


const Canvas = props => {

    const canvasRef = useRef(null)
    let frameCount = 10
    let animationFrameId

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
        const render = () => {
            // frameCount++
            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()


        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={canvasRef}  {...props} width={800} height={400} />
}

export default Canvas