
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SaturnLogo from "./SaturnLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <div className="cosmic-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="logo relative">
                <SaturnLogo className="h-10 w-10 animate-[glow_3s_ease-in-out_infinite]" />
              </div>
              <span className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Saturn Return
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/calculator"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Calculator
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              to="/calculator"
              className="saturn-button"
            >
              Calculate Now
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground p-2 rounded-md focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="cosmic-container py-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/calculator"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Calculator
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/calculator"
              className="block saturn-button text-center my-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Calculate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
