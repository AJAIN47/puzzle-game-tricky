const Instructions = () => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h2 className="text-xl font-bold text-brown mb-4">How to Play</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Enter your Student ID (digits only) and click "Start Game"</li>
        <li>The first 8 digits of your ID will be used as the target sequence</li>
        <li>The game will shuffle these numbers on the puzzle board</li>
        <li>Click on tiles adjacent to the empty space to move them</li>
        <li>Arrange the numbers to match your Student ID sequence in order</li>
        <li>To win, your ID sequence must be in positions 1-8 with the empty space in the bottom right corner</li>
      </ol>
      <div className="bg-gray-100 p-4 mt-4 rounded">
        <p className="font-medium mb-2">Win Condition Example:</p>
        <p className="mb-1">If your Student ID starts with <span className="font-bold">12345678</span>, you win when:</p>
        <div className="grid grid-cols-3 gap-1 max-w-[120px] text-center font-mono">
          <div className="bg-white border border-gray-300 p-1">1</div>
          <div className="bg-brown text-white p-1">2</div>
          <div className="bg-white border border-gray-300 p-1">3</div>
          <div className="bg-brown text-white p-1">4</div>
          <div className="bg-white border border-gray-300 p-1">5</div>
          <div className="bg-brown text-white p-1">6</div>
          <div className="bg-white border border-gray-300 p-1">7</div>
          <div className="bg-brown text-white p-1">8</div>
          <div className="p-1" style={{ backgroundColor: "#FFEB3B", borderWidth: "2px", borderColor: "#FBC02D", borderStyle: "solid", borderRadius: "0.25rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
