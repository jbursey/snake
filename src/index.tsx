import * as React from "react"
import * as ReactDom from "react-dom"
import Game from "./game"

const App = (props: any) => {
    return (
        <Game />
        // game controls component / start and stop
        // game over component
        // current score component        
    )    
}

ReactDom.render(<App />, document.getElementById("game"));