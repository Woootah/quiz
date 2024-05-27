import React, { useContext, useEffect, useRef} from 'react';
import { UserContext } from '../App';
import Footer from "./footer"; 
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';

const result = () => {
    const { finalScore, Email} = useContext(UserContext); 
    const navigate = useNavigate(); 
    const hasSubmitted = useRef(false); 

    useEffect(() => {
      if(!Email){
        navigate('/'); 
      }
    }, [])
    
    // useEffect(() => {
    //   if(!hasSubmitted.current && finalScore === 5){
    //       const user = {email: Email, score: finalScore}
    //       console.log(user);
    //         axios.post('http://localhost:3000/winner', user)
    //             .then(() => {
    //               console.log("Winner Recorded"); 
    //               hasSubmitted.current = true; 
    //             })
    //             .catch((error) => console.log(error))
    //     }
    //     else{
    //       console.log('Submission skipped, hasSubmitted:', hasSubmitted.current);
    //     }
    // }, [])
    
    
    const handleBounce = () => {
        window.location.href = "http://localhost:3000/api/logout";
    }
    
  return (
    <div className='bg-cwhite h-screen w-full grid place-content-center text-center'>
        {finalScore === 5 ? (
            <div>
                <p className='font-primary text-3xl font-light text-cred'>Congratulations!</p>
                <img src="/public/congrats_fin.png" alt="congrats" className='w-80 mx-auto' />
                <p className='font-secondary text-xs'>Claim your price from the seller</p>
            </div>
        ) : (
            <div>
                <p className='font-primary text-3xl font-light text-cred'>AWIT :&#40;</p>
                <img src="/public/sadded_fin.png" alt="congrats" className='w-72 mx-auto' />
                <p className='font-secondary text-sm'>Better Luck Next Time</p>
            </div>
        )}
        <button className='bg-cred border border-cred text-cwhite mt-8 py-2 rounded-full w-[50%] mx-auto font-secondary easing hover:bg-cwhite hover:text-cred' onClick={handleBounce}>Bounce</button>
        <Footer />
    </div>
  )
}

export default result