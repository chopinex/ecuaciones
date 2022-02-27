import React, { useState,useCallback } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate} from 'react-router-dom'
import app from '../../config'
//import { AuthContext } from '../../Auth'
import './Login.css'

const Registro=() =>{
    const [err,setErr] = useState("");
    const navigate =useNavigate();

    const handleSignup = useCallback(
        async event =>{
            event.preventDefault();
            const {email,password,password2} = event.target.elements;
            if(password.value===password2.value){
                setErr("");
                try{
                    await createUserWithEmailAndPassword(app,email.value,password.value);
                    navigate("/inicio");
                } catch(error){
                    console.log(error);
                }
            }
            else
                setErr("Las contraseñas no coinciden");
        },[navigate]
    );

    /*const {user} = useContext(AuthContext);

    if (user){
        return <Navigate to="/inicio" />;
    }*/

    return(
        <form onSubmit={handleSignup}>
            <h1>Registro</h1>
            <label>Email</label>
            <input name="email" type="email" />
            <label>Contraseña</label>
            <input name="password" type="password" onFocus={() => setErr("")}/>
            <label>Repite Contraseña</label>
            <input name="password2" type="password" onFocus={() => setErr("")}/>
            <div className="msg-error">{err}</div>
            <input type="submit" value="Regístrate" />
        </form>
    );
}

export default Registro;
