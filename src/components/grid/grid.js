import "./grid.css";
import { useState, useEffect, useRef } from "react";
import { width, colors, theTetrominoes } from "./tetrominoes.js";
import { Container } from "../container/container.js";

export const Grid = (props) => {
    // Grid Squares
    const [squares, setSquares] = useState(() => {
        let grid = [];
        for (let i = 0; i < 210; i++) {
            grid.push(
                <div
                    key={i.toString()}
                    className={i >= 200 ? "taken" : "free"}
                ></div>
            );
        }
        return grid;
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

    const [renderState, setRenderState] = useState(false);
    const render = useRef();
    useEffect(() => {
        render.current = renderState;
    }, [renderState]);

    const drawUndraw = () => {
        console.log(render.current);
        if (render.current === false) {
            setSquares((squares) => {
                currentTetromino.forEach((square) => {
                    squares[currentPos + square] = (
                        <div
                            key={currentPos + square}
                            className="tetromino"
                        ></div>
                    );
                });
                return squares;
            });
            setRenderState((r) => !r);
        } else {
            setSquares((squares) => {
                currentTetromino.forEach((square) => {
                    squares[currentPos + square] = (
                        <div key={currentPos + square} className="free"></div>
                    );
                });
                return squares;
            });
            setRenderState((r) => !r);
        }
    };

    const control = (e) => {
        if (e.keyCode === 38) {
            drawUndraw();
        }
    };

    useEffect(() => {
        if (props.gridHidden === false) {
            window.addEventListener("keydown", control);
        }
    }, [props.gridHidden]);

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
