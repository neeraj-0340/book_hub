import React from 'react'
import { MdLocalLibrary } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { LiaPenAltSolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { favourite, remove, libremove } from './Bookslice';


export const Mylibrary = () => {
    const dispatch=useDispatch();
    const mylb=useSelector((state)=>state.book.mylib)

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
          <Link to="/Favourites">
          <button className="flex gap-1 justify-center items-center"><FiHeart />Favourites</button></Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mylb.map(
            (item) =>item.title.toLowerCase().includes(Search.toLowerCase()) &&
             (
                <div key={item.id} className="p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
            <h1 className="flex justify-end pe-4 mb-3 font-semibold">
              <button onClick={()=>dispatch(favourite(item))}><FaHeart className="size-5"/></button>
              </h1>
            <div className="flex justify-center items-center mb-3">
            <h1><img src={item.cover_image} alt={item.title} className="w-24 h-36"/></h1>
            </div>
            <h1 className="mb-2 font-bold">Title : {item.title}</h1>
            <h1 className="mb-2 font-bold">Author : {item.author}</h1>
                  <button
                    className="btn rounded p-2 bg-blue-400 mt-2"
                    onClick={()=>dispatch(libremove(item.id))}
                  >
                    Remove
                  </button>
                </div>
              )
          )}
        </div>
    </div>
  )
}
