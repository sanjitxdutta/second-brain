import React, { useState } from "react";
import { FaTwitter, FaVideo, FaFileAlt, FaLink, FaTags } from "react-icons/fa";

const filters = [
    { label: "Tweets", value: "tweet", icon: <FaTwitter /> },
    { label: "Videos", value: "video", icon: <FaVideo /> },
    { label: "Documents", value: "document", icon: <FaFileAlt /> },
    { label: "Links", value: "link", icon: <FaLink /> },
    { label: "Tags", value: "tag", icon: <FaTags /> },
];

const Navbar: React.FC = () => {
    const [selected, setSelected] = useState<string>("");

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-md flex flex-col p-4">

            <div className="mb-6 flex items-center gap-3">
                <img src="/logo.png" alt="Second Brain Logo" className="w-6 h-6" />
                <h1 className="text-xl font-bold text-gray-800">Second Brain</h1>
            </div>

            <nav className="flex flex-col gap-2">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setSelected(f.value)}
                        className={`flex items-center gap-3 p-2 rounded-lg text-left transition ${selected === f.value
                            ? "bg-purple-500 text-white font-medium"
                            : "hover:bg-purple-300 text-purple-500"
                            }`}
                    >
                        <span className="text-lg">{f.icon}</span>
                        {f.label}
                    </button>
                ))}
            </nav>

            {/* Footer / Version */}
            <div className="mt-auto text-xs text-gray-400">
                v1.0.0 © 2025
            </div>
        </aside>
    );
};

export default Navbar;
