import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSubmit: (formData: SignupForm) => void;
  errors?: { field: string; message: string }[];
  setErrors?: (errors: { field: string; message: string }[]) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSubmit,
  errors,
  setErrors,
}) => {
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", email: "", password: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "" });
    if (setErrors) setErrors([]);
    onClose();
  };

  const inputClasses = "w-full border border-gray-300 rounded py-2 px-3 text-sm outline-none focus:border-purple-500 focus:ring-0 bg-white";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Sign Up</h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {errors && errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-xs">
            {errors.map((err, idx) => (
              <p key={idx}>{err.message}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClasses}
              required
            />
          </div>

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
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              handleClose();
              onSwitchToLogin();
            }}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
