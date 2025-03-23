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
 */
export function createSolvablePuzzle(targetSequence: number[]): {
  puzzleArray: (number | null)[];
  emptyPos: number;
} {
  let puzzleArray: (number | null)[];
  let emptyPos: number;
  
  do {
    // Create array with the target sequence and one null for empty space
    puzzleArray = [...targetSequence];
    // Randomly place the empty tile
    emptyPos = Math.floor(Math.random() * 9);
    puzzleArray.splice(emptyPos, 0, null);
    
    // Shuffle the non-null elements
    const nonNullElements = puzzleArray.filter(item => item !== null) as number[];
    const shuffledNonNull = shuffle(nonNullElements);
    
    // Reconstruct the array with the null in the same position
    puzzleArray = [];
    let nonNullIndex = 0;
    
    for (let i = 0; i < 9; i++) {
      if (i === emptyPos) {
        puzzleArray.push(null);
      } else {
        puzzleArray.push(shuffledNonNull[nonNullIndex]);
        nonNullIndex++;
      }
    }
    
  } while (
    // Make sure the puzzle is solvable and not already solved
    !isSolvable(puzzleArray) || 
    checkArraysEqual(puzzleArray.filter(n => n !== null) as number[], targetSequence)
  );
  
  return { puzzleArray, emptyPos };
}
