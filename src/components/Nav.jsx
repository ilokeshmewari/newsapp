import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTachometerAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Importing the icons from react-icons

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    // Check if user is logged in by checking localStorage or a global state
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      const response = await fetch(
        `https://vedantatimes.com/wp-json/wp/v2/posts?search=${searchKeyword}`
      );
      const data = await response.json();
      setSearchResults(data);
    }
  };

  const handleLogout = () => {
    // Update the login state and remove the user session from localStorage
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  const handleResultClick = (id) => {
    // Close the search modal
    setIsSearchOpen(false);
    // Redirect to the post page
    window.location.href = `/blogs/${id}`;
  };

  return (
    <nav className="bg-indigo-700 text-white px-6 sm:px-24 py-4 sm:py-6 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-4xl font-bold">
        <Link to="/">VT<span className="text-green-500 ">.</span></Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Desktop Menu (always visible) */}
      <div className="hidden sm:flex sm:items-center sm:space-x-8">
        <ul className="flex space-x-8">
          {/* Search Link */}
          <li className="text-white text-lg hover:text-gray-300 relative">
            <button onClick={toggleSearchModal} className="flex items-center space-x-2">
              <FaSearch /> <span>Search</span>
            </button>
            {isSearchOpen && (
              <div className="absolute top-12 left-0 w-64 bg-white text-black p-4 rounded-lg shadow-md z-50"> {/* Ensure it's on top with z-50 */}
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full p-2 border border-gray-300 mb-4"
                  placeholder="Enter search keyword"
                />
                <button
                  onClick={handleSearch}
                  className="w-full bg-indigo-700 text-white py-2 rounded-md"
                >
                  Search
                </button>

                <div className="mt-4">
                  {searchResults.length > 0 ? (
                    <ul className="space-y-4">
                      {searchResults.map((post) => (
                        <li
                          key={post.id}
                          className="text-lg hover:text-indigo-700 cursor-pointer"
                          onClick={() => handleResultClick(post.id)} // Added click handler
                        >
                          {post.title.rendered}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              </div>
            )}
          </li>

          {/* Dashboard Link */}
          <li className="text-white text-lg hover:text-gray-300">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FaTachometerAlt /> <span>Dashboard</span>
            </Link>
          </li>

          {/* Sign In / Logout Link */}
          <li className="text-white text-lg hover:text-gray-300">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center space-x-2">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <FaSignInAlt /> <span>Sign In</span>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden absolute top-16 left-0 w-full bg-indigo-800 z-50`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          {/* Search Link */}
          <li className="text-white text-lg hover:text-gray-300">
            <button onClick={toggleSearchModal} className="flex items-center space-x-2">
              <FaSearch /> <span>Search</span>
            </button>
            {/* Render search inside mobile menu */}
            {isSearchOpen && (
              <div className="absolute top-12 left-0 w-64 bg-white text-black p-4 rounded-lg shadow-md z-50">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full p-2 border border-gray-300 mb-4"
                  placeholder="Enter search keyword"
                />
                <button
                  onClick={handleSearch}
                  className="w-full bg-indigo-700 text-white py-2 rounded-md"
                >
                  Search
                </button>

                <div className="mt-4">
                  {searchResults.length > 0 ? (
                    <ul className="space-y-4">
                      {searchResults.map((post) => (
                        <li
                          key={post.id}
                          className="text-lg hover:text-indigo-700 cursor-pointer"
                          onClick={() => handleResultClick(post.id)}
                        >
                          {post.title.rendered}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              </div>
            )}
          </li>

          {/* Dashboard Link */}
          <li className="text-white text-lg hover:text-gray-300">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FaTachometerAlt /> <span>Dashboard</span>
            </Link>
          </li>

          {/* Sign In / Logout Link */}
          <li className="text-white text-lg hover:text-gray-300">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center space-x-2">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <FaSignInAlt /> <span>Sign In</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
