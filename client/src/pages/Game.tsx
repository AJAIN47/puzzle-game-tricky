import { useState } from "react";
import UserIdForm from "@/components/UserIdForm";
import GameBoard from "@/components/GameBoard";
import Instructions from "@/components/Instructions";
import WinModal from "@/components/WinModal";
import { createSolvablePuzzle } from "@/utils/gameUtils";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [targetSequence, setTargetSequence] = useState<number[]>([]);
  const [currentBoard, setCurrentBoard] = useState<(number | null)[]>([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState(2);
  const [moves, setMoves] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);

  const handleStartGame = (userId: string) => {
    // Take the first 8 digits as the target sequence
    const newTargetSequence = userId.substring(0, 8).split('').map(Number);
    setTargetSequence(newTargetSequence);
    
    // Create a solvable puzzle
    const { puzzleArray, emptyPos } = createSolvablePuzzle(newTargetSequence);
    setCurrentBoard(puzzleArray);
    setEmptyTileIndex(emptyPos);
    
    setMoves(0);
    setGameStarted(true);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setShowWinModal(false);
    setMoves(0);
    setTargetSequence([]);
    setCurrentBoard([]);
  };

  const handleShuffle = () => {
    if (gameStarted) {
      setMoves(0);
      const { puzzleArray, emptyPos } = createSolvablePuzzle(targetSequence);
      setCurrentBoard(puzzleArray);
      setEmptyTileIndex(emptyPos);
    }
  };

  const handleWin = () => {
    setShowWinModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-2">Student ID Number Puzzle</h1>
        <p className="text-lg text-brown-dark">Arrange the numbers to match your Student ID</p>
      </header>

      <div id="game-container" className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {!gameStarted ? (
          <UserIdForm onSubmit={handleStartGame} />
        ) : (
          <GameBoard
            targetSequence={targetSequence}
            currentBoard={currentBoard}
            emptyTileIndex={emptyTileIndex}
            moves={moves}
            onMove={(newBoard, newEmptyIndex) => {
              setCurrentBoard(newBoard);
              setEmptyTileIndex(newEmptyIndex);
              setMoves(moves + 1);
            }}
            onShuffle={handleShuffle}
            onNewGame={handleNewGame}
            onWin={handleWin}
          />
        )}

        <Instructions />
      </div>

      <footer className="text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Student ID Number Puzzle. All rights reserved.</p>
      </footer>

      {showWinModal && (
        <WinModal 
          moves={moves} 
          onNewGame={handleNewGame} 
          onClose={() => setShowWinModal(false)} 
        />
      )}
    </div>
  );
};

export default Game;
