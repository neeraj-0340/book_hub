import React from "react";
import { MdLocalLibrary } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { LiaPenAltSolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";
import { IoLibrarySharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios';
import { favourite, mylibrary } from "./Bookslice";
import { useEffect } from "react";


export const Library = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const[books,setbooks]=useState([]);
  const [Search, setSearch] = useState("");
  const[category,setCategory]=useState("");
  // const[fav,setFav]=useState("false");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.book.data);
  const fav = useSelector((state) => state.book.fav);

  //Dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //API fetching
  useEffect(()=>{
    const fetchbooks=async()=>{
      try{
        const response=await axios.get("http://localhost:8000/playlists");
      setbooks(response.data)
      }
      catch(error){
         console.error("error fetching books:",error);
      }
  };    
  fetchbooks();
  },[]);

  //Handling Search
  const handlesearch=(e)=>{
    setSearch(e.target.value);
  };

  //Handling Category
  const handlecategory=(e)=>{
    setCategory(e.target.value);
  };

  const clearcategory=()=>{
    setCategory("");
  };
  
  //Favourite
  const handleclick=()=>{
    if (fav) {
      alert("Added to favourites (-_-)...")
    }else{
      alert("Removed from favourites (-_-)...")

    }
  }

  console.log(books);
  
  return (
    <div>
      <div className="flex justify-between bg-blue-400 h-16 px-8 items-center">
        <Link to="/library"><h1 className="flex gap-2 text-3xl font-bold font-serif items-center">
          <MdLocalLibrary /> Book Hub
        </h1></Link>
        <div className="relative w-1/3 flex items-center">
          <FiSearch className="absolute top-3 left-4 text-gray-500 size-5" />
          <input
            type="text"
            onChange={handlesearch}
            placeholder="search for books"
            className="w-full h-10 pl-12 pb-1 rounded-full text-lg hover:bg-slate-100 focus:outline-none"
          />
        </div>
        <div className="flex gap-8 font-semibold">
        <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-rose-600 transition duration-200 mb-1"
            >
              Category
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-black text-white border rounded-md shadow-lg z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Adventure">Adventure</button></li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Science">Science</button></li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Horror">Horror</button></li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Cartoon">Cartoon</button></li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Romance">Romance</button></li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Fiction">Fiction</button></li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer"><button onClick={handlecategory} value="Dram">Drama</button></li>
                  <li className="px-4 py-2 bg-red-600 hover:bg-gray-600 cursor-pointer"><button onClick={clearcategory}>Clear</button></li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 hover:text-rose-600 transition duration-200">
          <LiaPenAltSolid/>
          <button>Authors</button>
          </div>
          <div className="flex items-center gap-1 hover:text-rose-600 transition duration-200">
          <Link to="/Favourites">
          <button className="flex gap-1 justify-center items-center"><FiHeart />Favourites</button></Link>
          </div>
          <Link to="/mylibrary"><div className="flex items-center gap-1 hover:text-rose-600 transition duration-200">
          <button className="flex gap-2 justify-center items-center"><IoLibrarySharp />My Library</button>
          </div></Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-8">
      {books.filter((item) => 
      item.genre.toLowerCase().includes(category.toLowerCase())
    ).map((item)=>item.title.toLowerCase().includes(Search.toLowerCase()) && (
        <div key={item.id} className="p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
            <h1 className="flex justify-end pe-4 mb-3 font-semibold">
              <button onClick={()=>{dispatch(favourite(item));handleclick();}}><FaHeart className="size-5"/></button>
              </h1>
            <div className="flex justify-center items-center mb-3">
            <Link to={`/detailedpage/${item.id}`}><h1><img src={item.cover_image} alt={item.title} className="w-24 h-36"/></h1></Link>
            </div>
            <h1 className="mb-2 font-bold">Title : {item.title}</h1>
            <h1 className="mb-2 font-bold">Author : {item.author}</h1>
            {/* <h1 className="mb-2 font-bold">Published year : {item.year_published}</h1>
            <h1 className="mb-2 font-bold">About : {item.description}</h1>
            <h1 className="mb-2 font-bold">Copies sold : {item.copies_sold}</h1> */}
            <h1><button onClick={()=>dispatch(mylibrary(item))} className="btn rounded-md bg-blue-400 px-4 py-2 font-semibold">Purchase</button></h1>
          </div>
        ))}
      </div>
    </div>
  );
};
