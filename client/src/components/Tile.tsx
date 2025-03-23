interface TileProps {
  value: number | null;
  index: number;
  emptyTileIndex: number;
  onClick: () => void;
  isMovable: boolean;
}

const Tile = ({ value, onClick, isMovable }: TileProps) => {
  if (value === null) {
    return (
      <div 
        className="w-full aspect-square flex items-center justify-center bg-white border-2 border-brown-light rounded"
        data-empty="true"
      />
    );
  }

  return (
    <div
      className={`w-full aspect-square flex items-center justify-center bg-brown rounded text-white font-mono text-3xl font-bold 
        ${isMovable ? 'cursor-pointer hover:opacity-90 transition' : 'opacity-90'}`}
      onClick={isMovable ? onClick : undefined}
    >
      {value}
    </div>
  );
};

export default Tile;
