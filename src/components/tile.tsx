import { getMarvelImage } from "../utils/imageImporter";
import "./tile.css";

interface TileProps {
  index: number;
  content: string;
  title: string;
  isMatched: boolean;
  handleTileClick: (title: string, index: number) => void;
  revealed: boolean;
}

const Tile = ({
  content,
  title,
  isMatched,
  index,
  handleTileClick,
  revealed,
}: TileProps) => {
  const selectTile = () => {
    if (isMatched) return;

    handleTileClick(title, index);
  };

  const Marvel = getMarvelImage();

  return (
    <div className={"grid-item flip-card" + (revealed ? " flip-card-selected" : "")}>
      <div className="grid-item__inner flip-card-inner" onClick={selectTile}>
        <div className="grid-item__card flip-card-front">
          <img
            src={Marvel}
            alt="Avatar"
          />
        </div>
        <div className="grid-item__card flip-card-back"> 
          <img className="tile-image" src={content} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default Tile;
