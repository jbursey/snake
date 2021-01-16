import * as React from "react";
import styled from 'styled-components';

interface GameMenuProps {
    onGameStart() : void;
}

const StyledMenuDiv = styled.div`
    background-color: #FF0000;
    height: 100%;
    width: 350px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledMenuItem = styled.div`
    background-color: #00FF00;
    line-height: 100px;
    margin: 10px;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: 32px;

    :hover {
        background-color: #0000FF;
    }
`;


const GameMenu = (props: GameMenuProps) => {
    const onMenuItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(event);
        props.onGameStart();
    }
    
    const menuItems = ["Start", "High Scores", "Options"];

    return (
        <StyledMenuDiv>
            {
                menuItems.map((item: string) => {
                    return (
                    <StyledMenuItem key={item} onClick={onMenuItemClick}>{item}</StyledMenuItem>
                    )   
                })
            }
        </StyledMenuDiv>
    )
}

export default GameMenu;