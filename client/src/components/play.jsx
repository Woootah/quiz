import React, { useContext, useEffect, useState } from "react";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const play = () => {
  const navigate = useNavigate();
  const { username } = useContext(UserContext);
  
  useEffect(() => {
    if(!username){
      navigate('/')
    }
  }, [])
  console.log(username); 

  const handlePlayClick = () => {
    navigate("/quiz");
  };


  return (
    <div className="bg-cwhite h-screen grid place-content-center text-center">
      <h1 className="text-7xl font-primary text-cred flex flex-col cursor-pointer">
        <span>Chiz</span>
        <span>Quiz</span>
      </h1>
      <p className="text-sm font-secondary mt-5 w-[60vw] text-gray-700 cursor-pointer">
        Discover, Learn, Conquer, &amp; Win Prizes!
      </p>
      <div
        className="font-secondary mt-14 border border-cred bg-cred py-3 rounded-full text-cwhite text-xl cursor-pointer easing hover:bg-transparent hover:text-cred"
        onClick={handlePlayClick}
      >
        Play
      </div>
      <Footer />
    </div>
  );
};

export default play;
