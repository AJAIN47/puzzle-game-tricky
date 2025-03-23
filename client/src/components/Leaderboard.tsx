import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LeaderboardEntry } from "../types/leaderboard";
import { getLeaderboard, clearLeaderboard } from "../utils/localStorage";

// Format date to readable format
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

// Format time elapsed to readable format (mm:ss)
const formatTimeElapsed = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setEntries(getLeaderboard());
  }, [isVisible]); // Refresh entries when visibility changes

  const handleClearLeaderboard = () => {
    if (window.confirm("Are you sure you want to clear the leaderboard?")) {
      clearLeaderboard();
      setEntries([]);
    }
  };

  return (
    <div className="my-4">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-brown text-white px-4 py-2 rounded mb-2 font-bold hover:bg-opacity-90 transition"
      >
        {isVisible ? "Hide Leaderboard" : "Show Leaderboard"}
      </Button>

      {isVisible && (
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-brown">Leaderboard</h3>
            {entries.length > 0 && (
              <Button
                onClick={handleClearLeaderboard}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded"
              >
                Clear
              </Button>
            )}
          </div>

          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No records yet. Be the first to solve the puzzle!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moves</th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.firstName} {entry.lastName}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {entry.userId}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTimeElapsed(entry.timeElapsed)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.moves}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-500">
                        {formatDate(entry.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;