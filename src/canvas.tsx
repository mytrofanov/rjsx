import React from 'react';
import './canvas.styles.css'
import {Rxjs} from "./rxjs";

const Canvas = () => {
    React.useEffect(()=>{
        Rxjs('canvas')
    },[])

    return (
        <div>
            <canvas id="canvas" className="canvas" width={400} height={400}></canvas>
        </div>
    );
};

export default Canvas;
