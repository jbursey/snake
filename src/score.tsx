import * as React from "react"
import styled from "styled-components"

export interface ScoreProps {
    score: number
}

const StyledScore = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    color: #FFF;
    width: 200px;
    font-weight: bold;
    line-height: 100px;
    text-align: center;
    justify-content: center;
    align-content: center;
`;

const Score = (props: ScoreProps) => {

    return (
        <StyledScore>
            {props.score}
        </StyledScore>
    )
}

export default Score;