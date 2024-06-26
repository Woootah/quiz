import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./footer";
import { server } from "../config.js"; 
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

const winners = () => {
  const [winnerList, setWinnerlist] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`${server}/winners`)
      .then((res) => setWinnerlist(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleBack = () => {
    navigate('/'); 
  }

  return (
    <div className="bg-cwhite h-screen w-full grid place-content-center text-center">
      <IoArrowBackSharp className="absolute top-4 left-4 text-3xl cursor-pointer" onClick={handleBack}/>
      <h1 className="font-primary text-4xl text-cred mb-8">Winners &#127881;</h1>
      {winnerList.length > 0 ? (
        <div>
          <div className="h-[65vh] w-full mt-4 overflow-auto overflow-x-hidden">
            {winnerList.map((winner) => (
                <div key={winner._id} className="font-secondary border-2 border-cred bg-cred text-cwhite py-3 px-4 text-center text-sm cursor-pointer mb-4 mx-4 easing hover:bg-cwhite hover:text-cred">
                    <p className="font-semibold mb-2 uppercase">{winner.username}</p>
                    <p className="text-[10px]">{formatDate(winner.dateWon)}</p>
                </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="font-secondary text-sm">So Empty . . .</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default winners;
