/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  // Create a copy of the array
  const newArray = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

/**
 * Checks if a sliding puzzle is solvable
 * In a 3x3 puzzle, if the number of inversions is even, the puzzle is solvable
 */
export function isSolvable(puzzle: (number | null)[]): boolean {
  const flatPuzzle = puzzle.filter(num => num !== null) as number[];
  let inversions = 0;
  
  for (let i = 0; i < flatPuzzle.length; i++) {
    for (let j = i + 1; j < flatPuzzle.length; j++) {
      if (flatPuzzle[i] > flatPuzzle[j]) {
        inversions++;
      }
    }
  }
  
  return inversions % 2 === 0;
}

/**
 * Check if arrays are equal
 */
export function checkArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * Creates a solvable puzzle from the target sequence
 * The empty space is always placed at position 8 (bottom right)
 */
export function createSolvablePuzzle(targetSequence: number[]): {
  puzzleArray: (number | null)[];
  emptyPos: number;
} {
  let puzzleArray: (number | null)[];
  const emptyPos = 8; // Always place empty tile at bottom right (index 8)
  
  do {
    // Shuffle the target sequence
    const shuffledNumbers = shuffle([...targetSequence]);
    
    // Create an array with 9 positions, put the empty space at position 8
    puzzleArray = Array(9).fill(null);
    
    // Fill positions 0-7 with shuffled numbers
    for (let i = 0; i < 8; i++) {
      puzzleArray[i] = shuffledNumbers[i];
    }
    
    // Position 8 remains null (empty)
  } while (
    // Make sure the puzzle is solvable and not already solved
    !isSolvable(puzzleArray) || 
    checkWinCondition(puzzleArray, targetSequence)
  );
  
  console.log("Created puzzle:", puzzleArray, "with empty at:", emptyPos);
  
  return { puzzleArray, emptyPos };
}

/**
 * Check if the current board matches the win condition:
 * - First 8 positions contain the target sequence in order
 * - Empty space is at the bottom right (position 8)
 */
export function checkWinCondition(board: (number | null)[], targetSequence: number[]): boolean {
  // Check if empty tile is at position 8
  if (board[8] !== null) return false;
  
  // Check if first 8 positions match target sequence
  for (let i = 0; i < 8; i++) {
    if (board[i] !== targetSequence[i]) return false;
  }
  
  return true;
}

/**
 * Get adjacent positions to a given index on the 3x3 board
 */
export function getAdjacentPositions(index: number): number[] {
  const positions = [];
  
  // Check position above
  if (index >= 3) {
    positions.push(index - 3);
  }
  
  // Check position below
  if (index < 6) {
    positions.push(index + 3);
  }
  
  // Check position to the left (not on left edge)
  if (index % 3 !== 0) {
    positions.push(index - 1);
  }
  
  // Check position to the right (not on right edge)
  if (index % 3 !== 2) {
    positions.push(index + 1);
  }
  
  return positions;
}
