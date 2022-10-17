import "./grid.css";
import { useState } from "react";
import { width, colors, theTetrominoes } from "./tetrominoes.js";
import { Container } from "../container/container.js";

const squareIdxs = [];
for (let i = 0; i < 210; i++) {
    squareIdxs.push(i);
}

export const Grid = (props) => {
    const [squareItems, setSquareItems] = useState(
        squareIdxs.map((squareIdx) => (
            <div
                className={squareIdx >= 200 ? "taken" : "free"}
                key={squareIdx.toString()}
            ></div>
        ))
    );

    // useEffect startGame when Play is pressed
    // useEffect pauseGame everytime Pause btn is pressed
    // useEffect endGame everytime gameOver or quit is pressed

    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            hidden={props.gridHidden}
            outerStyles={{
                minWidth: "42.5vmin",
                minHeight: "85vmin",
                maxWidth: "42.5vmin",
                maxHeight: "85vmin",
            }}
            innerStyles={{ padding: "0px", width: "100%", height: "100%" }}
            onClick={() => {
                return;
            }}
            innerContent={() => {
                return squareItems;
            }}
        />
    );
};
