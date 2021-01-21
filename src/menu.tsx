import * as React from "react";
import styled from 'styled-components';

interface GameMenuProps {
    onMenuItemSelected(name: string) : void;
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
    position: absolute;
    left: calc(50% - 175px);
    top: 0;
    z-index: 10;s
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

// export interface GameMenuItemProps {
//     name: string
//     onItemSelected();
//     children: JSX.Element;
// }

// const GameMenuItem = (props : GameMenuItemProps) => {
//     return (
//         <div onClick={props.onItemSelected(props.name)}>
//         {props.children}
//         </div>
//     )
// }

const GameMenu = (props: GameMenuProps) => {
    
    const menuItems = ["Start", "High Scores", "Options"];

    return (
        <StyledMenuDiv>
            {
                menuItems.map((item: string) => {
                    return (
                        <StyledMenuItem key={item} onClick={(event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {props.onMenuItemSelected(item);} }>{item}</StyledMenuItem>
                    )   
                })
            }
        </StyledMenuDiv>
    )
}

export default GameMenu;