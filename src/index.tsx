import * as React from "react"
import {useState, useEffect} from "react"
import * as ReactDom from "react-dom"
import Game from "./game2"


const App = (props: any) => {
    
    return (
        <>
            <Game />
        </>        
    )    
}

ReactDom.render(<App />, document.getElementById("game"));