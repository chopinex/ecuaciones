import React,{ useContext } from 'react'
import './Header.css'
import { AuthContext } from '../../Auth'
import { getAuth,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Header = () =>{
    const navigate =useNavigate();

    const {user} = useContext(AuthContext);
    const auth = getAuth();

    return(
        <header>
            <div className="logo">Logo</div>
            <div className="menu">
            {user?
                <>
                    <div className="menu-head">Hola {user.email}</div>
                    <div className="menu-head puntero" onClick={() => signOut(auth)}>Salir</div>
                </>
                :
                <>
                    <div className="menu-head puntero" onClick={() => navigate("/")}>Accede</div>
                    <div className="menu-head puntero" onClick={() => navigate("/registro")}>Regístrate</div>
                </>
            }
            </div>
        </header>
    );
}

export default Header;