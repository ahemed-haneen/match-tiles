import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./start-screen.css";

interface StartScreenProps {
  game: boolean;
  startGame: Dispatch<SetStateAction<boolean>>;
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
}

const StartScreen: React.FC<StartScreenProps> = ({
  game,
  startGame,
  playerName,
  setPlayerName,
}) => {
  const handleClick = () => {
    startGame(true);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value)
  }

  return (
    <div className="start-screen">
      <header className="start-screen-header">
        <h1>Welcome to the Marvel Memory Game!</h1>
      </header>
      <main className="start-screen-content">
        <label htmlFor="name">What's your name?</label>
        <div>
          <input type="text" id="name" name="name" required onChange={handleNameChange} />
        </div>
        <p>Test your memory with your favourite Marvel Characters</p>
        <button className="start-button" onClick={handleClick} disabled={(!playerName.length || game)}>
          Start Game
        </button>
      </main>
      <footer className="start-screen-footer">
        <p>Developed by Prashanthini and Friends</p>
      </footer>
    </div>
  );
};

export default StartScreen;
