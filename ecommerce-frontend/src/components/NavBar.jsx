import React, { useEffect, useRef, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { FaBars, FaCog, FaSearch, FaSignInAlt, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { useLaptopContext } from "./context/LaptopContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getUserCartItems } from "../util/ApiFunctions";

const NavBar = () => {
  const { laptops } = useLaptopContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null); // Reference to the dropdown
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = laptops.filter((laptop) =>
      laptop.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const { state } = useAuth();
  const { isLoggedIn } = state;
  const userRole = localStorage.getItem("role");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shopping-cart" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  // Sync active link with the current pathname
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ViewLaptop = (laptopId) => {
    navigate(`/laptop-details/${laptopId}`);
    setSearchResults([]);
  };

  // Close search dropdown if clicked outside
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <nav className="bg-gray-900 text-gray-300 shadow-lg sticky top-0 z-50 ">
      <div className="mx-auto px-[3vw] py-4 flex items-center justify-between ">
        {/* Logo */}
        <Link
  to="/"
  className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-900 to-pink-900 text-transparent bg-clip-text  lg:py-2"
>
  PrismTech
</Link>

        {/* Navigation Links */}
        <div
          className={`hidden lg:flex space-x-12 transition-all duration-300 ${activeLink === navLinks[1].path ? "translate-x-[-2vw] xl:translate-x-[-3vw]" : "translate-x-0"
            }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative transition ${activeLink === link.path
                ? "text-white after:scale-x-100"
                : "text-gray-300 after:scale-x-0 hover:text-blue-400 hover:after:scale-x-100"
                } after:content-[''] after:block after:h-0.5 after:bg-blue-400 after:transition-transform after:duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Show search bar only if in shop */}
        {activeLink === navLinks[1].path && (
          <div className="relative">
            {/* Search Bar */}
            <div
              className={`hidden lg:flex items-center bg-gray-800 px-3 rounded-lg transition-all duration-500 ease-in-out ${activeLink === navLinks[1].path ? "opacity-100" : "opacity-0"
                }`}
            >
              <input
                type="text"
                placeholder="Search laptops..."
                className="bg-transparent focus:outline-none text-gray-300 placeholder-gray-500 w-52 xl:w-80 py-2"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="text-blue-300">
                <FaSearch />
              </button>
            </div>

            {searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 bg-gray-950 text-white w-full opacity-95 max-w-sm rounded-lg shadow-lg overflow-y-auto z-50"
                style={{ maxHeight: "340px", scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <TransitionGroup component={null}>
                  {searchResults.map((laptop) => (
                    <CSSTransition key={laptop.id} timeout={500} classNames="laptop-list">
                      <button onClick={() => ViewLaptop(laptop.id)} className="w-full">
                        <div
                          key={laptop.id}
                          className="flex items-center gap-4 p-3 hover:bg-gray-800 cursor-pointer"
                        >
                          <img
                            src={laptop.imageUrl}
                            alt={laptop.name}
                            className="h-16 w-16 object-contain rounded-md"
                          />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <span className="text-sm">{laptop.name}</span>
                            <span className="text-xs text-blue-300">{laptop.processor}</span>
                          </div>
                        </div>
                      </button>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            )}
          </div>
        )}



        {/* Account and Cart */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative">
            <button
              className="hover:text-white transition flex items-center space-x-2"
              onClick={toggleAccountMenu}
            >
              <span className="text-lg">Account</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isAccountMenuOpen ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="relative">
              {isAccountMenuOpen && (
                <div className="absolute right-0 bg-gray-950 flex flex-col text-gray-300 rounded-lg shadow-md mt-2 w-48">
                  {!isLoggedIn ? (
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-3 hover:bg-gray-800"
                      onClick={toggleAccountMenu}
                    >
                      <FaSignInAlt className="mr-2" />
                      Login
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-800"
                        onClick={toggleAccountMenu}
                      >
                        <FaUser className="mr-2" />
                        Profile
                      </Link>
                      {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                        <Link
                          to="/admin-panel"
                          className="flex items-center px-4 py-3 hover:bg-gray-800"
                          onClick={toggleAccountMenu}
                        >
                          <FaCog className="mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/logout"
                        className="flex items-center px-4 py-3 hover:bg-gray-800"
                        onClick={toggleAccountMenu}
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-5 w-5"/>            
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="lg:hidden focus:outline-none mr-3"
          onClick={toggleMenu} // Toggle the menu when clicked
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu (Modal) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-12 right-0 bg-gray-950 bg-opacity-90 text-gray-300 shadow-lg py-6 w-36 rounded-l-lg">
          <div className="flex flex-col space-y-5 px-6 py-4 justify-evenly">
            <Link
              to="/"
              className="hover:text-white transition"
              onClick={toggleMenu} // Close menu when clicked
            >
              Home
            </Link>
            <Link
              to="/shopping-cart"
              className="hover:text-white transition"
              onClick={toggleMenu} // Close menu when clicked
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="hover:text-white transition"
              onClick={toggleMenu} // Close menu when clicked
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-white transition"
              onClick={toggleMenu} // Close menu when clicked
            >
              Contact
            </Link>
            <div className="relative">
              <button
                className="hover:text-white transition flex items-center space-x-2"
                onClick={toggleAccountMenu} // Open/close account menu, does not close the main menu
              >
                <span className="text-lg">Account</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isAccountMenuOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isAccountMenuOpen && (
                <div className="absolute right-0 bg-gray-950 opacity-90 flex flex-col text-gray-300 rounded-lg shadow-md mt-2 w-48">
                  {!isLoggedIn ? (
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-3 hover:bg-gray-700"
                      onClick={() => {
                        toggleMenu();
                        toggleAccountMenu();
                      }}
                    >
                      <FaSignInAlt className="mr-2" />
                      Login
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 hover:bg-gray-700"
                        onClick={() => {
                          toggleMenu();
                          toggleAccountMenu();
                        }}
                      >
                        <FaUser className="mr-2" />
                        Profile
                      </Link>
                      {isLoggedIn && userRole === 'ROLE_ADMIN' && (
                        <Link
                          to="/admin-panel"
                          className="flex items-center px-4 py-3 hover:bg-gray-700"
                          onClick={() => {
                            toggleMenu();
                            toggleAccountMenu();
                          }}
                        >
                          <FaCog className="mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/logout"
                        className="flex items-center px-4 py-3 hover:bg-gray-700"
                        onClick={() => {
                          toggleMenu();
                          toggleAccountMenu();
                        }}
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;


