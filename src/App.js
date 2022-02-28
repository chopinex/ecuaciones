import React from 'react'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Principal from './components/Principal/Principal'
import Login from './components/Login/Login'
import Registro from './components/Login/Registro'
import Landing from './components/Home/LandingPage'
import PrivateRoute from './PrivateRoute'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './Auth'

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/registro" element={<Registro/>} />
          <Route exact path="/inicio" element={<PrivateRoute/>}>
            <Route exact path="/inicio" element={<Home/>} />
          </Route>
          <Route exact path="/home" element={<PrivateRoute/>}>
            <Route exact path="/home" element={<Principal/>} />
          </Route>
        </Routes>
        <Footer/>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
