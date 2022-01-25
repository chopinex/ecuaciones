import React from 'react'
import './Header.css'

const Header = () =>{
    return(
        <header>
            <div className="logo">Logo</div>
            <div className="menu">
                <div className="menu-head">Accede</div>
                <div  className="menu-head">Regístrate</div>
            </div>
        </header>
    );
}

export default Header;