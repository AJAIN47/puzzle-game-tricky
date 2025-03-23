import { LeaderboardEntry } from "../types/leaderboard";

const LEADERBOARD_KEY = "puzzle_leaderboard";

export const saveToLeaderboard = (entry: LeaderboardEntry): void => {
  try {
    // Get existing leaderboard
    const leaderboard = getLeaderboard();
    
    // Add new entry
    leaderboard.push(entry);
    
    // Sort by time (ascending) and then by moves (ascending)
    leaderboard.sort((a, b) => {
      if (a.timeElapsed === b.timeElapsed) {
        return a.moves - b.moves;
      }
      return a.timeElapsed - b.timeElapsed;
    });
    
    // Save back to localStorage
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
  } catch (error) {
    console.error("Failed to save to leaderboard:", error);
  }
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve leaderboard:", error);
    return [];
  }
};

export const clearLeaderboard = (): void => {
  localStorage.removeItem(LEADERBOARD_KEY);
};