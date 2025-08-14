import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onSubmit: (formData: { email: string; password: string }) => Promise<boolean>;
}

const SigninModal: React.FC<SigninModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    setFormData({ email: "", password: "" });
    if (success) {
      setFormData({ email: "", password: "" });
      onClose();
    }
  };

  const inputClasses = "w-full border border-gray-300 rounded py-2 px-3 text-sm outline-none focus:border-purple-500 focus:ring-0 bg-white";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className={inputClasses}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToSignup();
            }}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SigninModal;
