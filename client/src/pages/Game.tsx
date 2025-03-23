import { useState, useEffect, useRef } from "react";
import UserIdForm from "@/components/UserIdForm";
import GameBoard from "@/components/GameBoard";
import Instructions from "@/components/Instructions";
import WinModal from "@/components/WinModal";
import Leaderboard from "@/components/Leaderboard";
import { createSolvablePuzzle } from "@/utils/gameUtils";
import { saveToLeaderboard } from "@/utils/localStorage";
import { LeaderboardEntry } from "@/types/leaderboard";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [targetSequence, setTargetSequence] = useState<number[]>([]);
  const [currentBoard, setCurrentBoard] = useState<(number | null)[]>([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState(2);
  const [moves, setMoves] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [playerInfo, setPlayerInfo] = useState<{
    firstName: string;
    lastName: string;
    userId: string;
  } | null>(null);
  
  // Timer refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // Start the timer when game starts
  useEffect(() => {
    if (gameStarted && !showWinModal) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setTimeElapsed(elapsed);
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStarted, showWinModal]);
  
  // Stop timer and save score when win modal shows
  useEffect(() => {
    if (showWinModal && playerInfo) {
      // Stop the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Save to leaderboard
      const entry: LeaderboardEntry = {
        firstName: playerInfo.firstName,
        lastName: playerInfo.lastName,
        userId: playerInfo.userId,
        timeElapsed,
        moves,
        timestamp: Date.now()
      };
      
      saveToLeaderboard(entry);
    }
  }, [showWinModal, playerInfo, timeElapsed, moves]);

  const handleStartGame = (userData: { userId: string; firstName: string; lastName: string }) => {
    // Store player info
    setPlayerInfo(userData);
    
    // Take the first 8 digits as the target sequence
    const newTargetSequence = userData.userId.substring(0, 8).split('').map(Number);
    setTargetSequence(newTargetSequence);
    
    // Create a solvable puzzle
    const { puzzleArray, emptyPos } = createSolvablePuzzle(newTargetSequence);
    setCurrentBoard(puzzleArray);
    setEmptyTileIndex(emptyPos);
    
    // Reset game state
    setMoves(0);
    setTimeElapsed(0);
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
          timeElapsed={timeElapsed}
          onNewGame={handleNewGame} 
          onClose={() => setShowWinModal(false)} 
        />
      )}
    </div>
  );
};

export default Game;
