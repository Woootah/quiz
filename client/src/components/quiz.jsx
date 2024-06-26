import React, { useEffect, useState, useContext} from "react";
import { UserContext } from "../App"; 
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";

const quiz = () => {
  const navigate = useNavigate()
  const { username, setUsername } = useContext(UserContext); 
  
  const handleNext = () => {
    navigate('/play'); 
  }

  return (
    <div className="font-secondary bg-cwhite h-screen grid place-content-center text-center">
      <h1 className="text-7xl font-primary text-cred flex flex-col cursor-pointer">
        <span>Chiz</span>
        <span>Quiz</span>
      </h1>
      <p className="text-sm font-secondary mt-5 w-[60vw] text-gray-700 cursor-pointer">
        Discover, Learn, Conquer, &amp; Win Prizes!
      </p>
      <input type="text" className="text-center bg-transparent border border-black mt-16 mb-4 h-14 placeholder:font-secondary placeholder:text-sm outline-none px-2" placeholder="Enter you username here" value={username} onChange={(e) => setUsername(e.target.value)}/>
      {username && (<button className="underline text-cred mb-14" onClick={handleNext}>next</button>) }
      <Link to='/winners' className="font-secondary mt-8 text-[13px] text-cred underline">Recent Winners</Link>
      <Footer />
    </div>
  );
};

export default quiz;
