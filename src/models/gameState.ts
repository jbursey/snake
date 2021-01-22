import {Point} from "./point"
import {KeyCode} from "./keyCode"

export interface GameState {
    snakePosition: Point[];
    foodPosition: Point;
    cellSize: number;
    updateDelayMS: number;
    lastKnownKeyCode: KeyCode;
    width: number;
    height: number;
}