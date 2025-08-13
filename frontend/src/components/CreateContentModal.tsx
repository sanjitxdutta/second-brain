import React, { useState } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa";

interface ContentForm {
  type: string;
  title: string;
  link: string;
  tags: string;
}

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ContentForm) => void;
}

const CreateContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContentForm>({
    type: "linkedin",
    title: "",
    link: "",
    tags: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ type: "linkedin", title: "", link: "", tags: "" });
    onClose();
  };

  const inputClasses =
    "w-full border border-gray-300 rounded py-2 px-3 text-sm outline-none focus:border-purple-500 focus:ring-0";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Content
          </h2>
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
              Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`${inputClasses} appearance-none`}
              >
                <option value="linkedin">Linkedin</option>
                <option value="tweet">Tweet</option>
                <option value="youtube">Youtube</option>
                <option value="blog">Blog</option>
                <option value="resource">Resource</option>
                <option value="important">Important</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContentModal;
