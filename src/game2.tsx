import * as React from "react";
import {useRef, useEffect} from "react"
import {GameState, KeyCode, Point} from "./models";

const Game2 = React.memo((props : any) => {
    let state : GameState;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let canvasRef = useRef<HTMLCanvasElement>(null);
    let reqAnimationFrame : number;
    let then: Date;
    let msSinceUpdate : number;

    const onKeyboardEvent  = (event : KeyboardEvent) => {
        let keyCode : KeyCode = KeyCode.NONE;
        switch(event.key)
        {
            case "ArrowUp":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.UP});
                if(state.lastKnownKeyCode == KeyCode.DOWN) return;
                keyCode = KeyCode.UP;
                break;
            case "ArrowDown":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.DOWN});
                if(state.lastKnownKeyCode == KeyCode.UP) return;
                keyCode = KeyCode.DOWN;
                break;
            case "ArrowLeft":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.LEFT});
                if(state.lastKnownKeyCode == KeyCode.RIGHT) return;
                keyCode = KeyCode.LEFT;
                break;
            case "ArrowRight":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.RIGHT});
                if(state.lastKnownKeyCode == KeyCode.LEFT) return;
                keyCode = KeyCode.RIGHT;
                break;
            case "Escape":
            default:
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.ESC});
                keyCode = KeyCode.ESC;
                break;
        }

        state.lastKnownKeyCode = keyCode;
        //console.log("Key: ", keyCode.toString());
    }

    const clear = (context: CanvasRenderingContext2D) => {
        //console.log("RenderTarget clear");
        context.clearRect(0, 0, state.width, state.height);
        context.fillStyle = "#000";
        context.fillRect(0, 0, state.width, state.height);
    }

    const draw = (gameState: GameState, context: CanvasRenderingContext2D) => {
        //console.log("RenderTarget draw");

        //snake
        let first: boolean = false;
        gameState.snakePosition.forEach((part: Point) => {
            context.fillStyle = "#00FF00";
            if(!first)
            {
                first = true;
                //context.fillStyle = "#0000FF";
                context.strokeStyle = "#0000FF";
                context.lineWidth = 5;
                context.strokeRect(part.x, part.y, gameState.cellSize, gameState.cellSize);
            }
            
            context.fillRect(part.x, part.y, gameState.cellSize, gameState.cellSize);
        });

        //food
        context.fillStyle = "#FF0000";
        context.fillRect(gameState.foodPosition.x, gameState.foodPosition.y, gameState.cellSize, gameState.cellSize);
    }

    const moveSnake = () => {
        let pos : Point = {
            x: state.snakePosition[0].x,
            y: state.snakePosition[0].y
        }

        switch(state.lastKnownKeyCode)
        {
            case KeyCode.UP:
                pos.y -= state.cellSize;
                break;
            case KeyCode.DOWN:
                pos.y += state.cellSize;
                break;
            case KeyCode.LEFT:
                pos.x -= state.cellSize;
                break;
            case KeyCode.RIGHT:
                pos.x += state.cellSize;
                break;
            case KeyCode.NONE:
            case KeyCode.ESC:
                return; //do nothing
        }
        
        //new head
        let newSnakePosition: Point[] = [];
        newSnakePosition.push(pos);
        for(let i = 1; i < state.snakePosition.length; i++)
        {
            newSnakePosition.push({x: state.snakePosition[i-1].x, y: state.snakePosition[i-1].y});
        }
        state.snakePosition = newSnakePosition;
        //console.log("Moving snake: ", state.snakePosition[0], state.lastKnownKeyCode);
    };

    const getRandomCellPosition = () : Point => {
        let x: number = 0;
        let y: number = 0;

        x = Math.floor((Math.random() * 10000) % (state.width - state.cellSize));
        y = Math.floor((Math.random() * 10000) % (state.height - state.cellSize));

        x = x - (x % state.cellSize);
        y = y - (y % state.cellSize);

        return {
            x: x,
            y: y
        };
    };

    const tryEatFood = () => {
        let head = state.snakePosition[0];
        let food = state.foodPosition;

        if(head.x == food.x && head.y == food.y)
        {
            //move it grow the snake
            let newSnakePos: Point[] = [];
            
            //push "food" to snake at its end opposite of the direction
            let tailPos = state.snakePosition[state.snakePosition.length - 1];
            let newTailPos : Point = {x: tailPos.x, y: tailPos.y};
            switch(state.lastKnownKeyCode)
            {
                case KeyCode.UP:
                    newTailPos.y += state.cellSize;
                    break;
                case KeyCode.DOWN:
                    newTailPos.y -= state.cellSize;
                    break;
                case KeyCode.LEFT:
                    newTailPos.x += state.cellSize;
                    break;
                case KeyCode.RIGHT:
                    newTailPos.x -= state.cellSize;
                    break;
                case KeyCode.NONE:
                case KeyCode.ESC:
                    return; //do nothing
            }
        
            for(let i = 0; i < state.snakePosition.length; i++)
            {
                newSnakePos.push({x: state.snakePosition[i].x, y: state.snakePosition[i].y});
            }
            newSnakePos.push(newTailPos);

            state.snakePosition = newSnakePos;
            state.foodPosition = getRandomCellPosition();
        }
    };

    const checkForGameOver = () => {
        // if snake is out of bounds
        let head = state.snakePosition[0];
        if(head.x > state.width || head.x < 0)
        {
            alert("Game Over: " + state.snakePosition.length);
            resetGame();
        }
        else if(head.y > state.height || head.y < 0)
        {
            alert("Game Over: " + state.snakePosition.length);
            resetGame();
        }

        // if snake is intersecting with itself
        for(let i = 1; i < state.snakePosition.length; i++)
        {
            let part = state.snakePosition[i];
            if(head.x == part.x && head.y == part.y)
            {
                alert("Game Over: " + state.snakePosition.length);
                resetGame();
                break;
            }
        }
    };

    const resetGame = () => {
        state.lastKnownKeyCode = KeyCode.NONE;
        state.snakePosition = [];
        state.snakePosition.push(getRandomCellPosition());
        state.foodPosition = getRandomCellPosition();
    };

    const render = () => {
        let now : Date = new Date();

        let dt = now.getTime() - then.getTime();
        msSinceUpdate += dt;

        then = now;

        clear(context);
        //console.log(msSinceUpdate, state.updateDelayMS);
        if(msSinceUpdate > state.updateDelayMS) //make part of prop initial
        {
            //move in last known direction
            moveSnake();
            //check for food eaten
            tryEatFood();
            //check for game over
            checkForGameOver();

            msSinceUpdate = 0;
        }

        draw(state, context);

        reqAnimationFrame = window.requestAnimationFrame(render);
    };

    useEffect(() => {
        then = new Date();
        msSinceUpdate = 0;
        state = {
            cellSize: 50,
            height: window.innerHeight,
            width: window.innerWidth,
            lastKnownKeyCode: KeyCode.NONE,
            updateDelayMS: 100,
            foodPosition: {x: 0, y: 0},
            snakePosition: [{
                x: 50,
                y: 50
            }]
        };
        state.snakePosition[0] = getRandomCellPosition();
        state.foodPosition = getRandomCellPosition();

        canvas = canvasRef.current;
        canvas.width = state.width;
        canvas.height = state.height;

        context = canvas.getContext("2d");

        window.onkeyup = onKeyboardEvent;
        render();

        return () => {
            console.log("Cancelling animation frame");
            window.cancelAnimationFrame(reqAnimationFrame);
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    )
});

export default Game2;