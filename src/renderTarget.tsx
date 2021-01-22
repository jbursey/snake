import * as React from "react";
import {useEffect, useRef} from "react";
import {GameState, Point} from "./models"


const RenderTarget = (props: GameState) => {
    let canvas: HTMLCanvasElement= null;
    let animationFrameHandle : number;
    let context: CanvasRenderingContext2D;
    let canvasRef = useRef<HTMLCanvasElement>(null);

    const clear = (context: CanvasRenderingContext2D) => {
        console.log("RenderTarget clear");
        context.clearRect(0, 0, props.width, props.height);
        context.fillStyle = "#000";
        context.fillRect(0, 0, props.width, props.height);
    }

    const draw = (gameState: GameState, context: CanvasRenderingContext2D) => {
        //console.log("RenderTarget draw");

        //food
        context.fillStyle = "#FF0000";
        context.fillRect(gameState.foodPosition.x, gameState.foodPosition.y, gameState.cellSize, gameState.cellSize);

        //snake
        gameState.snakePosition.forEach((part: Point) => {
            context.fillStyle = "#00FF00";
            context.fillRect(part.x, part.y, gameState.cellSize, gameState.cellSize);
        });
    }

    const render = () => {
        //console.log("RenderTarget render");

        //-- clear
        clear(context);
        //-- draw
        draw(props, context);
        //-- present

        animationFrameHandle = window.requestAnimationFrame(render);
    }

    useEffect(() => {
        //console.log("RenderTarget useEffect");
        //init
        canvas = canvasRef.current;
        canvas.width = props.width;
        canvas.height = props.height;

        context = canvas.getContext("2d");

        // loop
        render();

        return () => {
            console.log("Cancelling animation frame");
            window.cancelAnimationFrame(animationFrameHandle);
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    )
};

export default RenderTarget;