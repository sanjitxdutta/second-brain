import React, { useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaYoutube, FaBlog, FaBook, FaStar, FaBars, FaTimes } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { Link } from "react-router-dom";

interface NavbarProps {
  selected: string;
  setSelected: (val: string) => void;
}

const filters = [
  { label: "All", value: "", iconColor: "text-yellow-500", icon: AiFillDatabase },
  { label: "LinkedIn", value: "linkedin", iconColor: "text-blue-600", icon: FaLinkedin },
  { label: "Tweets", value: "tweet", iconColor: "text-sky-500", icon: FaTwitter },
  { label: "YouTube", value: "youtube", iconColor: "text-red-500", icon: FaYoutube },
  { label: "Blogs", value: "blog", iconColor: "text-orange-500", icon: FaBlog },
  { label: "Resources", value: "resource", iconColor: "text-green-600", icon: FaBook },
  { label: "Important", value: "important", iconColor: "text-yellow-500", icon: FaStar },
];

const Navbar: React.FC<NavbarProps> = ({ selected, setSelected }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          <Link to="/dashboard" className="mb-6 flex items-center gap-3 group cursor-pointer">
            <img src="/logo.png" alt="Second Brain Logo" className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-800 group-hover:text-purple-500 transition-colors">
              Second Brain
            </h1>
          </Link>

          <nav className="flex flex-col gap-2">
            {filters.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.value}
                  onClick={() => setSelected(f.value === selected ? "" : f.value)}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition ${selected === f.value
                    ? "bg-purple-500 text-white font-medium"
                    : "hover:bg-purple-300 text-purple-500"
                    }`}
                >
                  <Icon
                    className={`text-lg ${selected === f.value ? "text-white" : f.iconColor
                      }`}
                  />
                  {f.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto text-xs text-gray-400">v1.0.0 © 2025</div>
        </aside>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <>
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-purple-500 text-white p-3 rounded-full shadow-lg"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div
            className={`fixed bottom-0 left-0 w-full bg-white border-t shadow-lg rounded-t-2xl p-4 transition-transform duration-300 z-40 ${menuOpen ? "translate-y-0" : "translate-y-full"
              }`}
          >
            <div className="grid grid-cols-3 gap-4">
              {filters.map((f) => {
                const Icon = f.icon;
                return (
                  <button
                    key={f.value}
                    onClick={() => {
                      setSelected(f.value === selected ? "" : f.value);
                      setMenuOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${selected === f.value
                      ? "bg-purple-500 text-white font-medium"
                      : "hover:bg-purple-300 text-purple-500"
                      }`}
                  >
                    <Icon
                      className={`text-lg ${selected === f.value ? "text-white" : f.iconColor
                        }`}
                    />
                    <span className="text-xs">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
