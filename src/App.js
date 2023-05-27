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
import DietPage from './Components/DietPage';
import ExcercisePage from './Components/ExercisePage';
import Statistics from './Components/Statistics';
import Settings from './Components/Settings';

export const logContext = createContext();
export const idContext = createContext();
function App() {
  const [log, setLog] = useState('unlogged');
  const [id, setId] = useState('');
  return (
    <div className="App">
      <BrowserRouter>
        <idContext.Provider value={{id,setId}}>
        <logContext.Provider value={{log,setLog}}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/diet" element={<DietPage/>}/>
          <Route path="/exercise" element={<ExcercisePage/>}/>
          <Route path="/stats" element={<Statistics/>}/>
        </Routes>
        <Footer/>
        </logContext.Provider>
        </idContext.Provider>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
