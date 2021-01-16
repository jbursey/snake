import * as React from "react"
import {useState} from "react"
import * as ReactDom from "react-dom"
import Game from "./game"
import Menu from "./menu"

interface AppState {
    gameRunning: Boolean;

}

const App = (props: any) => {
    const[gameRunning, setGameRunning] = useState<boolean>(false);

    const onGameStart = () => {
        setGameRunning(true);
    }

    const onGamePause = () => {
        setGameRunning(false);
    }

        // game controls component / start and stop
        // game over component
        // current score component

        //--{gameRunning ? <Game onGamePause={onGamePause}/> : <Menu onGameStart={onGameStart} />}

    return (
        <>
        <Game onGamePause={onGamePause} />
        <Menu onGameStart={onGameStart} />
        </>        
    )    
}

ReactDom.render(<App />, document.getElementById("game"));