import "./grid.css";
import { useState, useEffect, useRef } from "react";
import { width, colors, theTetrominoes } from "../gameInfo.js";
import { Container } from "../../container/container.js";

export const Grid = (props) => {
    // Grid Squares
    const [squares, setSquares] = useState(() => {
        return [
            ...Array.from(Array(200), (_, i) => (
                <div key={i} className="free"></div>
            )),
            ...Array.from(Array(10), (_, i) => (
                <div key={i + 200} className="taken"></div>
            )),
        ];
    });

    const [timer, setTimer] = useState(1000);
    const [currentPos, setCurrentPos] = useState(4);
    const [currentRot, setCurrentRot] = useState(0);
    const [nextRandom, setNextRandom] = useState(
        Math.floor(Math.random() * theTetrominoes.length)
    );
    const [random, setRandom] = useState(
        Math.floor(Math.random() * theTetrominoes.length)
    );
    const [currentTetromino, setCurrentTetromino] = useState(
        theTetrominoes[random][currentRot]
    );

    const draw = () => {
        setSquares((sqrs) => {
            console.log(currentPos.valueOf);
            currentTetromino.forEach((sqrkey) => {
                sqrs[currentPos + sqrkey] = (
                    <div key={currentPos + sqrkey} className="tetromino"></div>
                );
            });
            return [...sqrs];
        });
    };

    const control = (e) => {
        if (e.keyCode === 37) {
            //moveLeft();
        } else if (e.keyCode === 38) {
            //rotate();
        } else if (e.keyCode === 39) {
            //moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    };

    useEffect(() => {
        if (props.gridHidden === false) {
            window.addEventListener("keydown", control);
        } else {
            window.removeEventListener("keydown", control);
        }
    }, [props.gridHidden]);

    const moveDown = () => {
        setCurrentPos((cur) => cur + width);
        draw();
    };

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
                return squares;
            }}
        />
    );
};
