import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./footer";

const game = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNext = () => {
    setQuestionIdx(questionIdx + 1); 
  }

  console.log(questionIdx)

  return (
    <div className="bg-cwhite h-screen grid place-content-center text-center">
      {questions.length > 0 ? (
        <div>
          <div className="text-xl font-secondary w-[60vw] break-words">
            <p>{questions[questionIdx].question}</p></div>
          {questions[questionIdx].type === "identification" ? (
            <div className="flex flex-col">
              <input type="text" placeholder="Enter your answer here . ." className="mt-16 p-4 bg-transparent border-2 border-cred outline-none w-[65vw] text-center placeholder:font-secondary placeholder:text-gray-500 placeholder:text-sm font-secondary"/>
              <button className="mt-8 font-secondary underline text-cred" onClick={handleNext}>next</button>
            </div>
          ) : (
            <div className="w-[60vw] grid grid-cols-2 gap-6 mt-16 font-secondary text-cwhite">
              {questions[questionIdx].choices && questions[questionIdx].choices.map((choice, index) => (
                <button key={index} className="py-3 easing bg-cred border border-cred hover:bg-transparent hover:text-cred" onClick={handleNext}>{choice}</button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="font-secondary">Loading</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default game;
