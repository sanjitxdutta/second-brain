import React, { useState, useEffect } from "react";
import {
  FaTwitter,
  FaVideo,
  FaFileAlt,
  FaLink,
  FaTags,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const filters = [
  { label: "Tweets", value: "tweet", icon: <FaTwitter /> },
  { label: "Videos", value: "video", icon: <FaVideo /> },
  { label: "Documents", value: "document", icon: <FaFileAlt /> },
  { label: "Links", value: "link", icon: <FaLink /> },
  { label: "Tags", value: "tag", icon: <FaTags /> },
];

const Navbar: React.FC = () => {
  const [selected, setSelected] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
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
                className={`flex items-center gap-3 p-2 rounded-lg text-left transition ${
                  selected === f.value
                    ? "bg-purple-500 text-white font-medium"
                    : "hover:bg-purple-300 text-purple-500"
                }`}
              >
                <span className="text-lg">{f.icon}</span>
                {f.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto text-xs text-gray-400">v1.0.0 © 2025</div>
        </aside>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <>
          {/* Floating Menu Button */}
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-purple-500 text-white p-3 rounded-full shadow-lg"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Slide-up Menu */}
          <div
            className={`fixed bottom-0 left-0 w-full bg-white border-t shadow-lg rounded-t-2xl p-4 transition-transform duration-300 z-40
              ${menuOpen ? "translate-y-0" : "translate-y-full"}`}
          >
            <div className="grid grid-cols-3 gap-4">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    setSelected(f.value);
                    setMenuOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${
                    selected === f.value
                      ? "bg-purple-500 text-white font-medium"
                      : "hover:bg-purple-300 text-purple-500"
                  }`}
                >
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-xs">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
