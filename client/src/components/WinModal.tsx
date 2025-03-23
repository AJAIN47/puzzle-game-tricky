import { Button } from "@/components/ui/button";

interface WinModalProps {
  moves: number;
  onNewGame: () => void;
  onClose: () => void;
}

const WinModal = ({ moves, onNewGame, onClose }: WinModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h2>
        <p className="text-lg mb-6">You solved the puzzle in {moves} moves!</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={onNewGame}
            className="bg-brown text-white px-6 py-2 rounded font-bold hover:bg-opacity-90 transition"
          >
            New Game
          </Button>
          <Button 
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-opacity-90 transition"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
