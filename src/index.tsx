import * as React from "react"
import {useState, useEffect} from "react"
import * as ReactDom from "react-dom"
import Game from "./game"
import Menu from "./menu"
import RenderTarget from "./renderTarget"
import { GameState, KeyCode, Point } from "./models"

const initialState: GameState = {
    cellSize: 20,
    height: window.innerHeight,
    width: window.innerWidth,
    lastKnownKeyCode: KeyCode.NONE,
    updateDelayMS: 500,
    foodPosition: {
        x: 20,
        y: 20
    },
    snakePosition: [{x: 100, y: 100}]
}

const App = (props: any) => {
    const [gameState, setGameState] = useState<GameState>(initialState);

    const onKeyPress = (event : KeyboardEvent) => {
        let keyCode : KeyCode = KeyCode.NONE;
        switch(event.key)
        {
            case "ArrowUp":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.UP});
                keyCode = KeyCode.UP;
                break;
            case "ArrowDown":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.DOWN});
                keyCode = KeyCode.DOWN;
                break;
            case "ArrowLeft":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.LEFT});
                keyCode = KeyCode.LEFT;
                break;
            case "ArrowRight":
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.RIGHT});
                keyCode = KeyCode.RIGHT;
                break;
            case "Escape":
            default:
                //setGameState({...gameState, lastKnownKeyCode: KeyCode.ESC});
                keyCode = KeyCode.ESC;
                break;
        }

        //--move snake
        moveSnake(keyCode)
    }

    const moveSnake = (keyCode : KeyCode) => {
        let pos : Point = {
            x: gameState.snakePosition[0].x,
            y: gameState.snakePosition[0].y
        }

        switch(keyCode)
        {
            case KeyCode.UP:
                pos.y -= gameState.cellSize;
                break;
            case KeyCode.DOWN:
                pos.y += gameState.cellSize;
                break;
            case KeyCode.LEFT:
                pos.x -= gameState.cellSize;
                break;
            case KeyCode.RIGHT:
                pos.x += gameState.cellSize;
                break;
        }
        console.log("Moving snake: ", pos, keyCode);
        setGameState({...gameState, snakePosition: [pos], lastKnownKeyCode: keyCode});
    };

    useEffect(() => {
        window.onkeyup = onKeyPress;
    }, []);

    const onMenuItemSelected = (name: string) => {
        
        switch(name)
        {
            case "Start":
                //start/resume game and hide menu
                break;
            case "High Scores":
                //pause game if started show high scores
                break;
            case "Options":
                //pause game if started show options
                break;
        }
    }

    return (
        <>
        <RenderTarget {...gameState} />
        <Menu onMenuItemSelected={onMenuItemSelected} />
        </>        
    )    
}

ReactDom.render(<App />, document.getElementById("game"));