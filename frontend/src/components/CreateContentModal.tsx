import React, { useState } from "react";
import { FaTimes, FaChevronDown } from "react-icons/fa";

interface ContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: {
        type: string;
        title: string;
        link: string;
        tags: string;
    }) => void;
}

const CreateContentModal: React.FC<ContentModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        type: "document",
        title: "",
        link: "",
        tags: "",
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData); // Trigger backend/event call
        setFormData({ type: "document", title: "", link: "", tags: "" });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close button */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <FaTimes className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="relative">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border appearance-none rounded py-2 px-3"
                                required
                            >
                                <option value="document">Document</option>
                                <option value="tweet">Tweet</option>
                                <option value="youtube">YouTube</option>
                                <option value="link">Link</option>
                            </select>
                            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter content title"
                            className="w-full border rounded py-2 px-3 text-sm"
                            required
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full border rounded py-2 px-3 text-sm"
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g. design, react, tailwind"
                            className="w-full border rounded py-2 px-3 text-sm"
                            required
                        />
                    </div>

                    {/* Submit */}
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
