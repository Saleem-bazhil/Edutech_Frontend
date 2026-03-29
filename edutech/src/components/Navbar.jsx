import { useState } from "react";
import { MessageSquare, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: "Home", to: "#home" },
    { name: "Features", to: "#features" },
    { name: "About", to: "#about" },
    { name: "How It Works", to: "#how-it-works" },
    { name: "Testimonials", to: "#testimonials" },
    { name: "Chat", to: "/chat" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#home" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  EduChat
                </span>
              </a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {menuLinks.map((link, index) => {
                  const isHash = link.to.startsWith("#");
                  return isHash ? (
                    <a
                      key={index}
                      href={link.to}
                      className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={link.to} // ✅ use `to`, not `href`
                      className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  );
                })}
              </div>

              {/* Desktop Button */}
              <button className="hidden md:block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105">
                Get Started
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="md:hidden w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-col gap-4">
                  {menuLinks.map((link, index) => {
                    const isHash = link.to.startsWith("#");
                    return isHash ? (
                      <a
                        key={index}
                        href={link.to}
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        key={index}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  <button className="mt-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold text-white shadow-lg shadow-purple-500/30">
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;