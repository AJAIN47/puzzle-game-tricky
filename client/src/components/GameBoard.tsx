import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Tile from "@/components/Tile";
import { checkWinCondition } from "@/utils/gameUtils";

interface GameBoardProps {
  targetSequence: number[];
  currentBoard: (number | null)[];
  emptyTileIndex: number;
  moves: number;
  onMove: (newBoard: (number | null)[], newEmptyIndex: number) => void;
  onShuffle: () => void;
  onNewGame: () => void;
  onWin: () => void;
}

const GameBoard = ({
  targetSequence,
  currentBoard,
  emptyTileIndex,
  moves,
  onMove,
  onShuffle,
  onNewGame,
  onWin
}: GameBoardProps) => {
  // Get adjacent tiles to the empty tile
  const getAdjacentTiles = (index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const adjacent = [];
    
    // Check up
    if (row > 0) adjacent.push(index - 3);
    // Check right
    if (col < 2) adjacent.push(index + 1);
    // Check down
    if (row < 2) adjacent.push(index + 3);
    // Check left
    if (col > 0) adjacent.push(index - 1);
    
    return adjacent;
  };

  // Handle tile click
  const handleTileClick = (index: number) => {
    const adjacentTiles = getAdjacentTiles(emptyTileIndex);
    
    if (adjacentTiles.includes(index)) {
      const newBoard = [...currentBoard];
      [newBoard[index], newBoard[emptyTileIndex]] = [newBoard[emptyTileIndex], newBoard[index]];
      
      onMove(newBoard, index);
    }
  };

  // Check for win after each move
  useEffect(() => {
    if (currentBoard.length > 0 && checkWinCondition(currentBoard, targetSequence)) {
      onWin();
    }
  }, [currentBoard, targetSequence, onWin]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-brown">Game Board</h2>
        <div className="flex gap-2">
          <Button 
            onClick={onShuffle}
            className="bg-brown-light text-brown-dark px-3 py-1 rounded text-sm font-bold hover:bg-opacity-90 transition"
          >
            Shuffle
          </Button>
          <Button 
            onClick={onNewGame}
            className="bg-brown text-white px-3 py-1 rounded text-sm font-bold hover:bg-opacity-90 transition"
          >
            New Game
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="font-medium mb-1">Target Sequence (Your ID):</p>
        <div className="flex gap-2 flex-wrap">
          {targetSequence.map((num, index) => (
            <div 
              key={`target-${index}`}
              className="w-10 h-10 flex items-center justify-center bg-brown-light rounded text-brown-dark font-mono text-xl font-bold"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      
      <p className="font-medium mb-2">Puzzle Board - Click tiles to move them:</p>
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {currentBoard.map((num, index) => (
          <Tile
            key={`puzzle-${index}`}
            value={num}
            index={index}
            emptyTileIndex={emptyTileIndex}
            onClick={() => handleTileClick(index)}
            isMovable={getAdjacentTiles(emptyTileIndex).includes(index)}
          />
        ))}
      </div>
      
      <div className="text-center mt-4 font-medium">
        Moves: <span>{moves}</span>
      </div>
    </div>
  );
};

export default GameBoard;
