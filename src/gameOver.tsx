import * as React from "react";
import styled, {keyframes} from "styled-components"

const animation = keyframes`
    0% {
        opacity: 0.2;
    }

    100% {
        opacity: 1.0;
    }
`;

const StyledGameOverMessage = styled.div`
    width: 600px;
    margin: auto;
    background-color: #FF0000;
    color: #FFF;
    font-weight: 800;
    height: 100vh;
    text-align: center;
    align-content: center;
    position: absolute;
    left: calc(50% - 150px);
    top: 0;

    animation-name: ${animation};
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-direction: alternate; /* Make the animation run back and forth */

`;

const AsciiArt = styled.div`
    
`;

const GameOverMessage = () => {
    const words = ["Rekt", "Gud", "Better", "Less Bad"];

    const getMessage = () : string => {
        let wordIndex = Math.floor((Math.random() * 1000) % words.length);
        let word = words[wordIndex];

        return `Game Over Get ${word}`;
    }

    return (
        <StyledGameOverMessage>
            <AsciiArt>
             ________  ________  _____ ______   _______           ________  ___      ___ _______   ________     
            |\   ____\|\   __  \|\   _ \  _   \|\  ___ \         |\   __  \|\  \    /  /|\  ___ \ |\   __  \    
            \ \  \___|\ \  \|\  \ \  \\\__\ \  \ \   __/|        \ \  \|\  \ \  \  /  / | \   __/|\ \  \|\  \   
            \ \  \  __\ \   __  \ \  \\|__| \  \ \  \_|/__       \ \  \\\  \ \  \/  / / \ \  \_|/_\ \   _  _\  
            \ \  \|\  \ \  \ \  \ \  \    \ \  \ \  \_|\ \       \ \  \\\  \ \    / /   \ \  \_|\ \ \  \\  \| 
            \ \_______\ \__\ \__\ \__\    \ \__\ \_______\       \ \_______\ \__/ /     \ \_______\ \__\\ _\ 
             \|_______|\|__|\|__|\|__|     \|__|\|_______|        \|_______|\|__|/       \|_______|\|__|\|__|

            </AsciiArt>
            <br />
            <br />
            {getMessage()}
        </StyledGameOverMessage>
    )
}

export default GameOverMessage;