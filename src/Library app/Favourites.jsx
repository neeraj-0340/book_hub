import React from 'react'
import { MdLocalLibrary } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { LiaPenAltSolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";
import { IoLibrarySharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mylibrary, remove } from './Bookslice';

export const Favourites = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.book.data);

    const [Search, setSearch] = useState("");
    const handlesearch=(e)=>{
      setSearch(e.target.value);
    };
  
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
          <div className="flex items-center gap-1 hover:text-rose-600 transition duration-200">
          <Link to="/mylibrary"><div className="flex items-center gap-1 hover:text-rose-600 transition duration-200">
          <button className="flex gap-2 justify-center items-center"><IoLibrarySharp />My Library</button>
          </div></Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map(
            (item) =>item.title.toLowerCase().includes(Search.toLowerCase()) &&
             (
                <div key={item.id} className="p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
            
            <div className="flex justify-center items-center mb-3">
            <h1><img src={item.cover_image} alt={item.title} className="w-24 h-36"/></h1>
            </div>
            <h1 className="mb-2 font-bold">Title : {item.title}</h1>
            <h1 className="mb-2 font-bold">Author : {item.author}</h1>
                  <div className='flex mt-3 gap-3'>
                  <button
                    className="btn rounded p-2 bg-blue-400"
                    onClick={()=>dispatch(remove(item.id))}
                  >
                    Remove
                  </button>
                  <h1><button onClick={()=>dispatch(mylibrary(item))} className="btn rounded-md bg-blue-400 px-4 py-2 font-semibold">Purchase</button></h1>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
  )
}
