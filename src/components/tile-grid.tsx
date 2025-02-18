import React, { useEffect, useState } from "react";
import Tile from "./tile";
import Randomizer from "../utils/randomizer";
import ImageCollection, { getImage } from "../utils/imageImporter";

import "./tile-grid.css";

interface TileGridProps {
  playerName: string
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
  const [gameInterval, setGameInterval] = useState<number | null>(null)
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

  const startTimer = () => {
    let interval = setInterval(() => setTime((time) => time + 1), 1000);
    setGameInterval(interval)
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
    const allMatched = tiles.length ? tiles.every((tile) => tile.isMatched) : false;
    if (allMatched) {
      setGameEnded(true);
    }
  }, [tiles]);

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      return startTimer()
    }  else if (gameInterval) {
      debugger;
      clearInterval(gameInterval)
    }
  }, [gameEnded, gameStarted, time]);

  const handleTileClick = (title: string, index: number, test=false) => {
    if (time == 0) {
      setTime(0);
      setGameStarted(true);
    }

    if (animationLoading) clearTimeout(animationLoading);

    if (!selectedTileOne) {
      setSelectedTileOne(title);
      setSelectedTiles([index]);
      console.log('selectedTiles : ', selectedTiles)
    } else {

      // if (index === selectedTiles[0]){
      //   debugger;
      //   setTiles((prevTiles) => {
      //     prevTiles[index].revealed = false;
      //     return [...prevTiles]
      //   })
      //   console.log('tiles : ', tiles)
      //   setTimeout(() => {
      //     debugger
      //     setAnimationLoading(null);
      //     setTiles((prevValue) => {
      //       prevValue.forEach((item, index) => {
      //         item.revealed = prevValue[index].isMatched;
      //       });
  
      //       return prevValue;
      //     });
  
      //     setSelectedTileOne(null);
      //     setSelectedTileTwo(null);
      //   }, 100);
      // } else {
        setSelectedTileTwo(title);
        setSelectedTiles((prevValue) => {
          return [...prevValue, index];
        });
      // }
    }
    setTiles((prevTiles) => {
      prevTiles[index].revealed = true;
      return [...prevTiles];
    });
  };

  useEffect(() => {
    if (selectedTileOne === selectedTileTwo && selectedTiles[0] != selectedTiles[1]) {
      setTiles((prevValue) => {
        prevValue.forEach((item, index) => {
          if (index == selectedTiles[0] || index == selectedTiles[1]) {
            item.isMatched = true;
          }

          item.revealed = prevValue[index].isMatched;
        });

        return prevValue;
      });

      setSelectedTileOne(null);
      setSelectedTileTwo(null);
    } else {

      let timeout = setTimeout(() => {
        setAnimationLoading(null);
        setTiles((prevValue) => {
          prevValue.forEach((item, index) => {
            item.revealed = prevValue[index].isMatched;
          });

          return prevValue;
        });

        setSelectedTileOne(null);
        setSelectedTileTwo(null);
      }, selectedTiles[0] != selectedTiles[1] ? 1000 : 0);

      setAnimationLoading(timeout);
    }

    setSelectedTiles([]);
  }, [selectedTileTwo]);

  return (
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
  );
};

export default TileGrid;
