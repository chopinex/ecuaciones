import React,{useState} from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import './Principal.css'

const Principal = () =>{
    const [{x,y},api] = useSpring(()=>({x:0,y:0}))
    const bind = useDrag(({ down, offset: [ox, oy] }) => 
        api.start({ x: ox, y: oy, immediate: down })
        , {
    bounds: { left: 0, right: 520, top: 0, bottom: 120 }
    })
    return(
    <div>
        <h1>Primer paso: reducción</h1>
        <div className="area-ecuacion">
            <animated.div
            className="elemento-ecuacion"
            {...bind()} style={{ x, y, touchAction: 'none' }}
            >3x</animated.div>
        </div>
    </div>
    );
}

export default Principal;