interface TileProps {
  index: number;
  content: string;
  title: string;
  isMatched: boolean;
  handleTileClick: (title: string, index: number) => void;
  revealed: boolean
}

const Tile = ({ content, title, isMatched, index, handleTileClick, revealed }: TileProps) => {
  const selectTile = () => {
    console.log('selectedTile : ', title, isMatched, revealed)
    if(isMatched)
      return 

    handleTileClick(title, index)
  };


  return (
    <div className={"flip-card" + (revealed ? " flip-card-selected" : "")}>
      <div className="flip-card-inner" onClick={selectTile}>
        <div className="flip-card-front">
          <img
            src="https://freesvg.org/img/1594640381alien-head-silhouette-freesvg.org.png"
            alt="Avatar"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="flip-card-back">
          <img className="tile-image" src={content} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default Tile;
