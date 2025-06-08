import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                    flex flex-col md:flex-row 
                    items-center md:items-start 
                    justify-between gap-6 md:gap-0"
      >
        {/* Social Icons (was: Company Name) */}
        <div className="mb-6 order-2 md:order-3 md:flex-1 text-center md:text-right">
          <div className="flex justify-center md:justify-end space-x-6">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.99 22 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.15 12.15 0 013 5.15a4.27 4.27 0 001.33 5.7 4.23 4.23 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.97A8.6 8.6 0 012 19.54 12.13 12.13 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0022.46 6z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.88 1.12a1.12 1.12 0 11-2.24 0 1.12 1.12 0 012.24 0zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 order-3 md:order-2 md:flex-1 justify-center">
          <Link to="/" className="hover:text-white transition font-medium">
            Home
          </Link>
          <Link
            to="/all-products"
            className="hover:text-white transition font-medium"
          >
            ALL Products
          </Link>
          <Link to="/about" className="hover:text-white transition font-medium">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Company Name (was: Social Icons) */}
        <div className="order-1 md:order-1 md:flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white cursor-default select-none">
            ShopEase
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Quality products, delivered with care.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
