import React, { useEffect, useState } from "react";
import Tile from "./tile";
import Randomizer from "../utils/randomizer";
import ImageCollection, { getImage } from "../utils/imageImporter";

import "./tile-grid.css";

interface TileGridProps {
  playerName: string;
}

interface Tile {
  image: string;
  title: string;
  isMatched: boolean;
  revealed: boolean;
}

const TileGrid: React.FC<TileGridProps> = ({ playerName }) => {
  const [selectedTileOne, setSelectedTileOne] = useState<string | null>(null);
  const [selectedTileTwo, setSelectedTileTwo] = useState<string | null>(null);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [animationLoading, setAnimationLoading] = useState<null | number>(null);
  const [gameInterval, setGameInterval] = useState<number | null>(null);
  const cardItems = ImageCollection;

  const [time, setTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [tiles, setTiles] = useState<Tile[]>([]);

  const [gameStarted, setGameStarted] = useState(false);
  const gridWidth = 5;
  const gridHeight = 4;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const triggerCloseAnimation = () => {
    setAnimationLoading(null);
    setTiles((prevValue) => {
      return [
        ...prevValue.map((item, index) => {
          item.revealed = prevValue[index].isMatched;
          return item;
        }),
      ];
    });

    setSelectedTileOne(null);
    setSelectedTileTwo(null);
  };

  const startTimer = () => {
    let interval = setInterval(() => setTime((time) => time + 1), 1000);
    setGameInterval(interval);
    return () => clearInterval(interval);
  };

  const totalTiles = gridWidth * gridHeight;

  useEffect(() => {
    const randomizer = new Randomizer({ itemList: cardItems });

    setTiles(
      Array.from({ length: totalTiles }, (_) => {
        const randomItem = randomizer.getRandomItem();
        return {
          image: getImage(randomItem),
          title: randomItem,
          isMatched: false,
          revealed: false,
        };
      })
    );
  }, []);

  useEffect(() => {
    const allMatched = tiles.length
      ? tiles.every((tile) => tile.isMatched)
      : false;
    if (allMatched) {
      setGameEnded(true);
      const confettiWrapper = document.querySelector(".confetti-wrapper");
      // Generate confetti
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti-piece");
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.setProperty(
          "--fall-duration",
          `${Math.random() * 3 + 3}s`
        );
        confetti.style.setProperty("--confetti-color", getRandomColor());
        confettiWrapper?.appendChild(confetti);
      }

      if (confettiWrapper) {
        confettiWrapper.classList.add("blur")
      }

      function getRandomColor() {
        const colors = ["#ff6347", "#ffa500", "#32cd32", "#1e90ff", "#ff69b4"];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    }
  }, [tiles]);

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      return startTimer();
    } else if (gameInterval) {
      clearInterval(gameInterval);
    }
  }, [gameEnded, gameStarted, time]);

  const handleTileClick = (title: string, index: number) => {
    if (time == 0) {
      setTime(0);
      setGameStarted(true);
    }

    if (animationLoading) {
      clearTimeout(animationLoading);
      triggerCloseAnimation();
    }

    if (!selectedTileOne) {
      setSelectedTileOne(title);
      setSelectedTiles([index]);
    } else {
      setSelectedTileTwo(title);
      setSelectedTiles((prevValue) => {
        return [...prevValue, index];
      });
    }
    setTiles((prevTiles) => {
      let currentTiles = [...prevTiles];
      currentTiles[index].revealed = true;
      return currentTiles;
    });
  };

  useEffect(() => {
    if (
      selectedTileOne === selectedTileTwo &&
      selectedTiles[0] != selectedTiles[1]
    ) {
      setTiles((prevValue) => {
        let currentTiles = [...prevValue];

        currentTiles.forEach((item, index) => {
          if (index == selectedTiles[0] || index == selectedTiles[1]) {
            item.isMatched = true;
          }

          item.revealed = currentTiles[index].isMatched;
        });

        return currentTiles;
      });

      setSelectedTileOne(null);
      setSelectedTileTwo(null);
    } else {
      let timeout = setTimeout(
        triggerCloseAnimation,
        selectedTiles[0] != selectedTiles[1] ? 1000 : 0
      );

      setAnimationLoading(timeout);
    }

    setSelectedTiles([]);
  }, [selectedTileTwo]);

  return (
    <>
      <div className="confetti-wrapper">
        {/* <!-- Confetti elements will be created using CSS --> */}
      </div>
      <div className="game">
        <h1 className="introductory-message">Welcome {playerName}</h1>
        <div className="grid-container tile-grid game-board__background game-board">
          {tiles.map((tile, index) => (
            <Tile
              key={index}
              index={index}
              content={tile.image}
              title={tile.title}
              isMatched={tile.isMatched}
              revealed={tile.revealed}
              handleTileClick={handleTileClick}
            />
          ))}
        </div>
        <div className="game-timer">{formatTime(time)}</div>
      </div>
    </>
  );
};

export default TileGrid;
