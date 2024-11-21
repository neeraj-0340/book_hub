import React from "react";
import { MdLocalLibrary } from "react-icons/md";
import { RiQuillPenLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

export const Demo = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-400 to-blue-600 h-16 px-8 shadow-lg">
        {/* Logo Section */}
        <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
          <MdLocalLibrary className="text-white" /> Book Hub
        </h1>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <FiSearch className="absolute top-3 left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for books"
            className="w-full h-10 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-gray-700 shadow-sm"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 text-white font-medium">
          <button className="hover:text-yellow-300 transition duration-200">
            Category
          </button>
          <button className="hover:text-yellow-300 transition duration-200">
            Author
          </button>
          <button className="hover:text-yellow-300 transition duration-200">
            Favourites
          </button>
          <button className="hover:text-yellow-300 transition duration-200">
            My Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
