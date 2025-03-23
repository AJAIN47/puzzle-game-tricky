export interface LeaderboardEntry {
  firstName: string;
  lastName: string;
  userId: string;
  timeElapsed: number; // in seconds
  moves: number;
  timestamp: number; // unix timestamp
}