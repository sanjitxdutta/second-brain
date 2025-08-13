import React, { useState } from "react";
import { FaTimes, FaCopy, FaCheck } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, link }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy link.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Share Your Brain</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center border rounded-lg py-2 px-3 bg-gray-50">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          <button
            onClick={handleCopy}
            className="ml-2 text-gray-500 hover:text-purple-500"
            title="Copy link"
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Share this link with others to let them view your content.
        </p>
      </div>
    </div>
  );
};

export default ShareModal;
