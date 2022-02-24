import React from 'react'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Principal from './components/Principal/Principal'
import Login from './components/Login/Login'

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/inicio" element={<Principal/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
