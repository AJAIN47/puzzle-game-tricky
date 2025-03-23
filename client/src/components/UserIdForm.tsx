import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserIdFormProps {
  onSubmit: (userData: { userId: string; firstName: string; lastName: string }) => void;
}

const UserIdForm = ({ onSubmit }: UserIdFormProps) => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{
    userId?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const isValidStudentId = (id: string) => {
    return /^\d+$/.test(id) && id.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {
      userId?: string;
      firstName?: string;
      lastName?: string;
    } = {};
    
    if (!isValidStudentId(userId)) {
      newErrors.userId = "Please enter a valid Student ID (digits only, at least 8 digits).";
    }
    
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit({ userId, firstName, lastName });
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-brown mb-4">Player Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-brown-light rounded focus:outline-none focus:ring-2 focus:ring-brown transition"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-brown-light rounded focus:outline-none focus:ring-2 focus:ring-brown transition"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <Input
            id="userId"
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
                setErrors(prev => ({ ...prev, userId: undefined }));
              }
            }}
          />
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
        </div>
        
        <Button 
          type="submit"
          className="bg-brown text-white px-6 py-2 rounded font-bold hover:bg-opacity-90 transition w-full"
        >
          Start Game
        </Button>
      </form>
    </div>
  );
};

export default UserIdForm;
