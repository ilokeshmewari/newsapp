import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white p-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p>Email: contact@vt.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Pages</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Categories</h3>
          <ul className="space-y-1">
            <li>
              <a href="/category/sports" className="hover:underline">
                Sports
              </a>
            </li>
            <li>
              <a href="/category/news" className="hover:underline">
                News
              </a>
            </li>
            <li>
              <a href="/category/entertainment" className="hover:underline">
                Entertainment
              </a>
            </li>
            <li>
              <a href="/category/technology" className="hover:underline">
                Technology
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Information</h3>
          <ul className="space-y-1">
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Horizontal line */}
      <hr className="border-white my-4" />

      <p className="text-center mt-4">Copyright &copy; 2025 Vt.com. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
