import "./index.css";
import Quiz from "./components/quiz";
import { Routes, Route } from "react-router-dom";
import Play from "./components/play";
import Game from "./components/game";
import Result from "./components/result"; 
import Winners from "./components/winners"; 
import React, { useState } from "react";

export const UserContext = React.createContext();

const App = () => {
  const [Email, setEmail] = useState(''); 
  const [finalScore, setFinalScore] = useState(0); 

  return (
    <div>
      <UserContext.Provider value={{Email, setEmail, finalScore, setFinalScore}}>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/play" element={<Play />} />
          <Route path="/quiz" element={<Game />} />
          <Route path="/result" element={<Result />} />
          <Route path="/winners" element={<Winners />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
