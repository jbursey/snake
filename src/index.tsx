import * as React from "react"
import {useState, useEffect} from "react"
import * as ReactDom from "react-dom"
import Game from "./game"
import Score from "./score"
import GameOverMessage from "./gameOver"


const App = (props: any) => {
    let intervalHandle: NodeJS.Timeout;
    let gameOverTimeout: NodeJS.Timeout;

    let points: number;
    const [score, setScore] = useState<number>(0);
    const [showGameOver, setShowGameOver] = useState<boolean>(false);

    useEffect(() => {
        points = 0;

    }, []);

    const onScoreUpdate = () => {
        points += 100;
        setScore(points);
    }

    const onGameOver = () => {
        points = 0;
        setScore(points);
        setShowGameOver(true);

        gameOverTimeout = setTimeout(() => {
            setShowGameOver(false);
        }, 5000);
    }

    return (
        <>
            <Game onScoreUpdate={onScoreUpdate} onGameOver={onGameOver}/>
            <Score score={score}/>
            {showGameOver && <GameOverMessage />}
        </>        
    )    
}

ReactDom.render(<App />, document.getElementById("game"));