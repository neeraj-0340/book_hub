import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { favourite, mylibrary } from "./Bookslice";

export const Detailedpage = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For back navigation

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/playlists/${id}`);
        setBook(response.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;
  }

  if (error || !book) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        Error fetching book details. <br />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={book.cover_image}
          alt={book.title}
          className="w-48 h-72 object-cover rounded-md shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <p className="mb-2 text-lg">Author: <span className="font-semibold">{book.author}</span></p>
          <p className="mb-2 text-lg">Genre: <span className="font-semibold">{book.genre}</span></p>
          <p className="mb-4 text-lg">Published: <span className="font-semibold">{book.year_published}</span></p>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(favourite(book))}
              className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2"
            >
              <FaHeart /> Add to Favourites
            </button>
            <button
              onClick={() => dispatch(mylibrary(book))}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add to My Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
