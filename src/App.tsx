import { useState } from 'react'
import './App.css'
import TileGrid from './components/tile-grid'

function App() {

  return (
    <>
      <TileGrid tiles={["A", "B", "C", "D", "E", "F"]}></TileGrid>
    </>
  )
}

export default App
