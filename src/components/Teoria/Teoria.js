import React from 'react'
import './Teoria.css'
import aresApuntar from './ares_apuntar.png'
import ranaApuntar from './rana_apuntar.png'
const Teoria = ()  =>{
    return(<div className="contenido">
            <div className="titulo">
                ¿Qué es una ecuación?
            </div>
            <div style={{width: "138px", height: "249px",backgroundImage: "url("+aresApuntar+")", position: "absolute",
             animation: "aApunta 2s steps(30) infinite", left:"25vw"}}></div>
            <div className="texto">
                Es una igualdad matemática
            </div>
            <div className="subtitulo">
                Partes de una ecuación
            </div>
            <div className="ecuacion">
                <div className="elemento">3x</div>
                <div className="elemento">-   10</div>
                <div className="elemento">=</div>
                <div className="elemento">x</div>
                <div className="elemento">+   20</div>
            </div>
            <div className="ecuacion">
                <div className="miembro">&nbsp;Primer miembro</div>
                <div className="miembro">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className="miembro">Segundo miembro</div>
            </div>
            <div style={{width: "111px", height: "232px",backgroundImage: "url("+ranaApuntar+")", position: "absolute",
             animation: "rApunta 2s steps(30) infinite", left:"60vw",top:"40vh"}}></div>
            <div className="subtitulo">
                Tipos de términos
            </div>
            <div className="texto">
                Términos lineales: 3x, x
            </div>
            <div className="texto">
                Términos independientes: -10, 20
            </div>
            <div style={{height: "200px"}}>&nbsp;</div> 
        </div>
        );
}

export default Teoria;