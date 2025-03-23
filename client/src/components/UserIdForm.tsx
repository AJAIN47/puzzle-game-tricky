import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserIdFormProps {
  onSubmit: (userId: string) => void;
}

const UserIdForm = ({ onSubmit }: UserIdFormProps) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const isValidStudentId = (id: string) => {
    return /^\d+$/.test(id) && id.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidStudentId(userId)) {
      setError("Please enter a valid Student ID (digits only, at least 8 digits).");
      return;
    }
    
    setError("");
    onSubmit(userId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-brown mb-4">Enter Your Student ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="e.g. 801321665"
              maxLength={12}
              className="w-full px-4 py-2 border border-brown-light rounded focus:outline-none focus:ring-2 focus:ring-brown transition font-mono"
              value={userId}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers
                if (/^\d*$/.test(value)) {
                  setUserId(value);
                  setError("");
                }
              }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button 
            type="submit"
            className="bg-brown text-white px-6 py-2 rounded font-bold hover:bg-opacity-90 transition"
          >
            Start Game
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserIdForm;
