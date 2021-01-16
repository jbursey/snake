import * as React from "react";
import {useEffect, useRef} from "react";

export interface Point {
    x:number,
    y:number
}

export interface GameProps {
    onGamePause() : void;
}

const Game = (props: GameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>();
    let context : CanvasRenderingContext2D = null;
    let frames:number = 0;
    let framesThisSecond:number = 0;
    let dt = 0;
    let then:Date = new Date();
    
    //--snake components
    //--snake head position
    //--eventually this should be an array, with arr[0] being the snake head. Then each new cell is the previous cells pos and the head is calculated
    let width: number = 1200;
    let height: number = 800;

    let snakePos: Array<Point> = [];    

    let snakeSize:number = 25;

    let foodPos : Point = { x: 50, y: 50};
    let lastKnownKey = "";
    let milliSecondDelay = 300;

    let handleAnimationFrame : number = 0;;

    //--effects
    useEffect(() => {
        console.log("Use effect [] called");        
        console.log(canvasRef);        
        
        then = new Date();

        handleAnimationFrame = 0;

        window.addEventListener("keydown", onKeyboardEvent);
        width = window.screen.width
        height = window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;        

        context = canvasRef.current.getContext("2d");       
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);        

        handleAnimationFrame = window.requestAnimationFrame(render);

        snakePos.push({x: 500, y: 500}); //head
    }, []);

    useEffect(() => {
        console.log("Use effect NULL called");
    });

    const render = ()=> {      
        clearCanvas();  
        const now : Date = new Date();

        const ms : number = now.getTime() - then.getTime();
        then = now;

        dt += ms;
        frames++;
        framesThisSecond++;

        if(dt > milliSecondDelay)
        {
            //console.log("Frames: ", frames, "FTS: ", framesThisSecond, "DT: ", dt, "FPS: ", framesThisSecond / (dt / 1000.0)); 
            dt = 0;
            framesThisSecond = 0;                
            moveSnake(lastKnownKey);
        }

        //--app
        renderSnake();
        renderFood();

        handleAnimationFrame = window.requestAnimationFrame(render);
    }

    const renderSnake = () => {
        snakePos.map((part: Point) => {
            context.fillStyle = "#00FF00";
            context.fillRect(part.x, part.y, snakeSize, snakeSize);                        
        });        
    };

    const renderFood = () => {
        context.fillStyle = "#FF0000";
        context.fillRect(foodPos.x, foodPos.y, snakeSize, snakeSize);
    };

    const clearCanvas = () => {
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);        
    }

    const eatFood = () => {
        //grow the snake
        snakePos.push({
            x: foodPos.x,
            y: foodPos.y
        });

        //move the food        
        let newX = Math.floor((Math.random() * 10000) % (width - snakeSize));
        let newY = Math.floor((Math.random() * 10000) % (height - snakeSize));
        newX = newX - (newX % snakeSize);
        newY = newY - (newY % snakeSize);

        foodPos.x = newX;
        foodPos.y = newY;        
        
        milliSecondDelay = milliSecondDelay * 0.8;
    };

    const moveSnake = (directionCode: string) => {
        let newHead : Point = {
            x: snakePos[0].x,
            y: snakePos[0].y
        }

        switch(directionCode)
        {
            case "ArrowUp":
                newHead.y -= snakeSize;
                break;
            case "ArrowDown":
                newHead.y += snakeSize;
                break;
            case "ArrowLeft":
                newHead.x -= snakeSize;
                break;
            case "ArrowRight":
                newHead.x += snakeSize;
                break;
            case "Escape":
                props.onGamePause();
                window.cancelAnimationFrame(handleAnimationFrame);
                break;
            default:
                return; //do nothing                
        }
                
        let newSnake: Array<Point> = [];
        newSnake.push(newHead);
        for(let i = 1; i < snakePos.length; i++)
        {
            newSnake[i] = snakePos[i - 1];
        }

        snakePos = newSnake;

        if(newHead.x < 0 || newHead.x >= width)
        {
            //game over?
            console.log("Game Over Width");
        }

        if(newHead.y < 0 || newHead.y >= height)
        {
            //game over?
            console.log("Game Over Height");
        }

        for(let i = 0; i < snakePos.length; i++)
        {
            let partA = snakePos[i];
            for(let j = 0; j < snakePos.length; j++)
            {
                if(i == j) continue;

                let partB = snakePos[j];

                if(partA.x == partB.x && partA.y == partB.y)
                {
                    //game over?
                    console.log("Game Over", partA, partB, snakePos);
                }

            }
        }

        for(let i = 0; i < snakePos.length; i++)
        {
            let part = snakePos[i];

            if(part.x == foodPos.x && part.y == foodPos.y)
            {
                eatFood();
            }
        }


    };

    const onKeyboardEvent = (event: KeyboardEvent) => {
        console.log(event);
        lastKnownKey = event.key;
        //moveSnake(event.key);
    };

    return (
        <canvas id="game-screen" ref={canvasRef}></canvas>
    )    
}

export default Game;