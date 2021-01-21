import * as React from "react"
import {useEffect, useRef} from "react"

const Scene = (props) => {

    let reqAnimationHandle: number;
    let canvasRef = useRef<HTMLCanvasElement>(null);
    let then : Date;

    const update = () => {


        //reqAnimationHandle = window.requestAnimationFrame(update);
    };

    useEffect(() => {
        console.log("Scene useEffect NULL");

        setTimeout(() => {
            update();
        }, 2000);
    });

    useEffect(() => {
        console.log("Scene useEffect fnUpdate");
    }, [update])
    
    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Scene;