import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./footer";
import { server } from "../config"; 

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

  useEffect(() => {
    axios
      .get(`${server}/winners`)
      .then((res) => setWinnerlist(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-cwhite h-screen w-full grid place-content-center text-center">
      <h1 className="font-primary text-4xl text-cred mb-8">Winners &#127881;</h1>
      {winnerList.length > 0 ? (
        <div>
          <div className="h-[65vh] w-full mt-4 overflow-auto overflow-x-hidden">
            {winnerList.map((winner) => (
                <div key={winner._id} className="font-secondary border-2 border-cred bg-cred text-cwhite py-3 px-4 text-center text-sm cursor-pointer mb-4 mx-4 easing hover:bg-cwhite hover:text-cred">
                    <p className="font-semibold">{winner.email}</p>
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
