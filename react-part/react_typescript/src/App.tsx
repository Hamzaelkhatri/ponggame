import React, { useRef } from 'react'
import Canvas from './Canvas'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // var game = new Game(canvasRef.current)
  // game.start()

   
    return (<Canvas/>)
}

export default App

