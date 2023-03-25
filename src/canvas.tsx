import React from 'react';
import './canvas.styles.css'
import {Rxjs} from "./rxjs";

const Canvas = () => {
    React.useEffect(()=>{
        Rxjs('canvas')
    },[])

    return (
        <div>
            <canvas id="canvas" className="canvas"></canvas>
        </div>
    );
};

export default Canvas;
