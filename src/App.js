import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import {
  BrowserRouter, Route, Routes, Link
} from "react-router-dom";
import { useState,createContext } from "react";

export const logContext = createContext();
function App() {
  const [log, setLog] = useState("unlogged");
  return (
    <div className="App">
      <BrowserRouter>
      <logContext.Provider value={{log,setLog}}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <Footer/>
        </logContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
