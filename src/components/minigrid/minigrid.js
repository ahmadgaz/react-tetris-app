import "./minigrid.css";
import { useState } from "react";
import { Container } from "../container/container.js";

const squareIdxs = [];
for (let i = 0; i < 16; i++) {
    squareIdxs.push(i);
}
export const Minigrid = () => {
    const [squareItems, setSquareItems] = useState(
        squareIdxs.map((squareIdx) => (
            <div className="miniSquares" key={squareIdx.toString()}></div>
        ))
    );
    return (
        <Container
            hidden={false}
            outerStyles={{
                minWidth: "30vmin",
                minHeight: "30vmin",
                maxWidth: "30vmin",
                maxHeight: "30vmin",
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
