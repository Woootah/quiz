import './index.css'
import Quiz from "./components/quiz"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import Play from "./components/play"
import Game from "./components/game"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Quiz />}/>
        <Route path='/play' element={<Play />}/>
        <Route path='/quiz' element={<Game />}/>
      </Routes>
    </div>
  )
}

export default App