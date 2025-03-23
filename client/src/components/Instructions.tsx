const Instructions = () => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h2 className="text-xl font-bold text-brown mb-4">How to Play</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Enter your Student ID (digits only) and click "Start Game"</li>
        <li>The first 8 digits of your ID will be used as the target sequence</li>
        <li>The game will shuffle these numbers on the puzzle board</li>
        <li>Click on tiles adjacent to the empty space to move them</li>
        <li>Arrange the numbers to match your Student ID sequence</li>
        <li>Win when the numbers match your ID in the correct order!</li>
      </ol>
    </div>
  );
};

export default Instructions;
