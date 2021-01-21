import * as React from "react"
import {useState, useEffect} from "react"
import * as ReactDom from "react-dom"
import Game from "./game"
import Menu from "./menu"
import Scene from "./scene"

interface AppState {
    gameRunning: Boolean;

}

const App = (props: any) => {
    let foo = true;
    const[gameRunning, setGameRunning] = useState<boolean>(false);

    useEffect(() => {
        console.log("App effect []");

    }, []);

    useEffect(() => {
        console.log("Use Effect game running changed:", gameRunning);
        setTimeout(() => {
            console.log("Game running: ", gameRunning);
            //setGameRunning(!gameRunning);
        }, 1000);
    }, [gameRunning]);

    useEffect(() => {
        console.log("App effect NULL");
    });

    const onGameStart = () => {
        setGameRunning(true);
    }

    const onGamePause = () => {
        setGameRunning(false);
    }

    const onFoodEaten = () => {

    }

    const startGame = () => {

    }

    const pauseGame = () => {

    }

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


        // game controls component / start and stop
        // game over component
        // current score component

        //--{gameRunning ? <Game onGamePause={onGamePause}/> : <Menu onGameStart={onGameStart} />}
        //--{gameRunning && <Game onGamePause={onGamePause}/>}

    return (
        <>
        <Scene />
        <Menu onMenuItemSelected={onMenuItemSelected} />
        </>        
    )    
}

ReactDom.render(<App />, document.getElementById("game"));