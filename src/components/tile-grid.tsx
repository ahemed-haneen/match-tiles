import React, { useEffect, useState } from "react";
import Tile from "./tile";
import Randomizer from "../utils/randomizer";
import ImageCollection, { getImage } from "../utils/imageImporter";

interface TileGridProps {}

interface Tile {
  image: string;
  title: string;
  isMatched: boolean;
  revealed: boolean;
}

const TileGrid: React.FC<TileGridProps> = () => {
  const [selectedTileOne, setSelectedTileOne] = useState<string | null>(null);
  const [selectedTileTwo, setSelectedTileTwo] = useState<string | null>(null);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [animationLoading, setAnimationLoading] = useState<null | number> (null);

  const cardItems = ImageCollection;
  const [tiles, setTiles] = useState<Tile[]>([]);

  const gridSize = 4;
  const totalTiles = gridSize * gridSize;

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

  const handleTileClick = (title: string, index: number) => {
    if (animationLoading) clearTimeout(animationLoading);

    if (!selectedTileOne) {
      setSelectedTileOne(title);
      setSelectedTiles([index]);
    } else {
      setSelectedTileTwo(title);
      setSelectedTiles((prevValue) => {
        prevValue.push(index);
        return prevValue;
      });
    }
    setTiles((prevTiles) => {
      prevTiles[index].revealed = true;
      return [...prevTiles];
    });
  };

  useEffect(() => {
    if (selectedTileOne === selectedTileTwo) {
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
      if (animationLoading)
        clearTimeout(animationLoading)
      setAnimationLoading(
        setTimeout(() => {
          setTiles((prevValue) => {
            prevValue.forEach((item, index) => {
              item.revealed = prevValue[index].isMatched;
            });

            return prevValue;
          });

          setSelectedTileOne(null);
          setSelectedTileTwo(null);
        }, 1000)
      );

    }

    setSelectedTiles([]);
  }, [selectedTileTwo]);

  return (
    <div className="tile-grid game-board__background game-board">
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
  );
};

export default TileGrid;
