import React from 'react'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Principal from './components/Principal/Principal'
import Login from './components/Login/Login'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './Auth'

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/inicio" element={<PrivateRoute/>}>
            <Route exact path="/inicio" element={<Principal/>} />
          </Route>
        </Routes>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
