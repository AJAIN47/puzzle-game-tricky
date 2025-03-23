interface TileProps {
  value: number | null;
  index: number;
  emptyTileIndex: number;
  onClick: () => void;
  isMovable: boolean;
}

const Tile = ({ value, index, onClick, isMovable }: TileProps) => {
  // Handle empty tile - make it very obvious with a bright yellow color
  if (value === null) {
    return (
      <div 
        className="w-full aspect-square flex items-center justify-center rounded"
        style={{ 
          backgroundColor: "#FFEB3B", 
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "#FBC02D"
        }}
        data-empty="true"
      />
    );
  }

  // Alternate tile colors like the example image (brown and white)
  const isEvenPosition = (Math.floor(index / 3) + (index % 3)) % 2 === 0;
  
  return (
    <div
      className={`w-full aspect-square flex items-center justify-center rounded font-mono text-3xl font-bold
        ${isEvenPosition 
          ? 'bg-white text-brown-dark border-2 border-gray-300' 
          : 'bg-brown text-white'
        }
        ${isMovable ? 'cursor-pointer hover:opacity-90 transition' : 'opacity-90'}`}
      onClick={isMovable ? onClick : undefined}
    >
      {value}
    </div>
  );
};

export default Tile;
