import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./footer";

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
      .get("https://chizquiz.onrender.com/winners")
      .then((res) => setWinnerlist(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-cwhite h-screen w-full grid place-content-center text-center">
      {winnerList.length > 0 ? (
        <div>
          <h1 className="font-primary text-4xl text-cred">Winners &#127881;</h1>
          <div className="w-[60vw] mt-8">
            {winnerList.map((winner) => (
                <div key={winner._id} className="font-secondary border-2 border-cred bg-cred text-cwhite py-3 px-4 text-center cursor-pointer mt-4 easing hover:bg-cwhite hover:text-cred">
                    <p className="font-semibold">{winner.email}</p>
                    <p className="text-xs">{formatDate(winner.dateWon)}</p>
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
