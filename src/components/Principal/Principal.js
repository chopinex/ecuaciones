import React,{useState} from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import './Principal.css'

const Principal = () =>{
    const [nivel,setNivel] =useState(1)
    const [{x,y},api] = useSpring(()=>({x:0,y:0}))
    
    const bind = useDrag(({ down, offset: [ox, oy] }) => 
        api.start({ x: ox, y: oy, immediate: down })
        , {
    bounds: { left: 0, right: 520, top: 0, bottom: 120 }
    })

    const handleChange = (event) =>{
        console.log(parseInt(event.target.value))
        setNivel(parseInt(event.target.value));
    }

    if(nivel===1){
        return(
            <div>
                 <h1>Primer paso: reducción</h1>
                 <div className="area-ecuacion">
                    <div className="ecuacion">
                        <div className="lineal">4x</div>
                        <div className="igual">=</div>
                        <div className="constante">12</div>
                    </div>
                 </div>
                 <select onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                 </select> 
            </div>
        );    
    }
    if(nivel===2){
        return(
            <div>
                <h1>Segundo paso: transposicion</h1>
                <div className="area-ecuacion">
                    <animated.div
                    className="elemento-ecuacion"
                    {...bind()} style={{ x, y, touchAction: 'none' }}
                    >3x</animated.div>
                </div>
                <select onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                 </select> 
            </div>
        );}
}

export default Principal;