import { useState } from 'react'
import './App.css'
import TileGrid from './components/tile-grid'
import StartScreen from './components/start-screen';

function App() {
  const [game, startGame] = useState(false);
  const [playerName, setPlayerName] = useState('')


    if (game === false){
      return <StartScreen game={game} startGame={startGame} playerName={playerName} setPlayerName={setPlayerName} />
    } else {
      return <TileGrid playerName={playerName} />
    }
}

export default App
