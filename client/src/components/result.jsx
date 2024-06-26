import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../config.js"; 

const result = () => {
  const { finalScore, username, setUsername} = useContext(UserContext);
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, []);

  const handleBounce = () => {
    if (finalScore === 5 && !hasSubmitted.current) {
      const user = { username: username, score: finalScore };
      hasSubmitted.current = true; 
      axios
      .post(`${server}/winner`, user)
      .then(() => {
        console.log("Winner Recorded");
        })
        .catch((error) => {
          console.log(error); 
          hasSubmitted.current = false; 
        });
    }
    setUsername(''); 
    navigate('/'); 
  };

  return (
    <div className="bg-cwhite h-screen w-full grid place-content-center text-center">
      {finalScore === 5 ? (
        <div>
          <p className="font-primary text-3xl font-light text-cred">
            Congratulations!
          </p>
          <img
            src="congrats_fin.png"
            alt="congrats"
            className="w-80 mx-auto"
          />
          <p className="font-secondary text-xs">
            Claim your prize from the seller
          </p>
        </div>
      ) : (
        <div>
          <p className="font-primary text-3xl font-light text-cred">
            AWIT :&#40;
          </p>
          <img
            src="sadded_fin.png"
            alt="congrats"
            className="w-72 mx-auto"
          />
          <p className="font-secondary text-sm">Better Luck Next Time</p>
        </div>
      )}
      <button
        className="bg-cred border border-cred text-cwhite mt-8 py-2 rounded-full w-[50%] mx-auto font-secondary easing hover:bg-cwhite hover:text-cred"
        onClick={handleBounce}
      >
        Bounce
      </button>
      <Footer />
    </div>
  );
};

export default result;
