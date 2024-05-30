import React, { useEffect, useState, useContext} from "react";
import { UserContext } from "../App"; 
import Footer from "./footer";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const quiz = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate = useNavigate()
  const { Email } = useContext(UserContext); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    if (message) {
      setErrorMessage(decodeURIComponent(message));
      setIsOpen(true);
    }
  }, []);

  const handleAuth = () => {
    window.location.href = "https://chizquiz.onrender.com/auth/google";
  };

  return (
    <div className="bg-cwhite h-screen grid place-content-center text-center">
      {isOpen && (
        <div
          className="w-full h-full fixed top-0 left-0 grid place-content-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div className="w-80 h-60 bg-cwhite flex justify-center items-center flex-col cursor-pointer relative">
            <IoMdClose
              className="absolute right-3 top-3 text-2xl"
              onClick={() => setIsOpen(false)}
            />
            <img src="public/cat.svg" alt="sad_cat" className="w-14 mb-1" />
            <p className="font-secondary text-xs mb-4 ">
              &#40; sad cat noises... &#41;
            </p>
            <p className="font-secondary text-sm w-48">{errorMessage}</p>
          </div>
        </div>
      )}
      <h1 className="text-7xl font-primary text-cred flex flex-col cursor-pointer">
        <span>Chiz</span>
        <span>Quiz</span>
      </h1>
      <p className="text-sm font-secondary mt-5 w-[60vw] text-gray-700 cursor-pointer">
        Discover, Learn, Conquer, &amp; Win Prizes!
      </p>
      <div
        className="border mt-16 bg-white w-[60vw] rounded-full py-3 px-4 cursor-pointer font-secondary easing hover:bg-cwhite hover:border-black text-sm flex justify-center items-center"
        onClick={handleAuth}
      >
        <FcGoogle className="text-xl mr-4" />
        Log in with Google
      </div>
      <Link to='/winners' className="font-secondary mt-8 text-[13px] text-cred underline">Recent Winners</Link>
      <Footer />
    </div>
  );
};

export default quiz;
