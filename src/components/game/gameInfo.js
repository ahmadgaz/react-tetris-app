import "./grid.css";
import { useEffect, useRef, useState } from "react";

// Tetrominos
const width = 10;
const colors = ["orange", "red", "purple", "green", "blue"];
const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
];
const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
];
const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
];
const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
];
const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
];
const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
];

// Setters
export const useSetGrid = () => {
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

    const timer = useRef();
    const currentPos = useRef(4);
    const currentRot = useRef(0);
    const random = useRef(Math.floor(Math.random() * theTetrominoes.length));
    const nextRandom = useRef(
        Math.floor(Math.random() * theTetrominoes.length)
    );
    const currentTetromino = useRef(
        theTetrominoes[random.current][currentRot.current]
    );
    const draw = (sqrs) => {
        // draw tetromino
        currentTetromino.current.forEach((sqrkey) => {
            sqrs[currentPos.current + sqrkey] = (
                <div
                    key={currentPos.current + sqrkey}
                    className="tetromino"
                ></div>
            );
        });
        return [...sqrs];
    };
    const undraw = (sqrs) => {
        // undraw tetromino

        currentTetromino.current.forEach((sqrkey) => {
            sqrs[currentPos.current + sqrkey] = (
                <div key={currentPos.current + sqrkey} className="free"></div>
            );
        });
        return [...sqrs];
    };
    const isRightAboveTakenSquare = (cur) => {
        return cur.some((sqrKey) => {
            return (
                squares[currentPos.current + sqrKey + width] ===
                (
                    <div
                        key={currentPos.current + sqrKey + width}
                        className="taken"
                    ></div>
                )
            );
        });
    };
    const freeze = (sqrs) => {
        if (isRightAboveTakenSquare(currentTetromino.current)) {
            // freeze square and update grid

            currentTetromino.current.forEach((sqrkey) => {
                sqrs[currentPos.current + sqrkey] = (
                    <div
                        key={currentPos.current + sqrkey}
                        className="taken"
                    ></div>
                );
            });
            random.current = nextRandom.current;
            nextRandom.current = Math.floor(
                Math.random() * theTetrominoes.length
            );
            currentRot.current = 0;
            currentTetromino.current =
                theTetrominoes[random.current][currentRot.current];
            currentPos.current = 4;
            draw(sqrs);
            //setNextTetromino();
            // add score bs
            // add gameover bs
            return [...sqrs];
        }
    };
    const atLeftEdge = (cur) => {
        return (
            cur.some((sqrKey) => {
                return (currentPos.current + sqrKey) % width === 0;
            }) ||
            cur.some((sqrKey) => {
                return (
                    squares[currentPos.current + sqrKey - 1] ===
                    (
                        <div
                            key={currentPos.current + sqrKey - 1}
                            className="taken"
                        ></div>
                    )
                );
            })
        );
    };
    const atRightEdge = (cur) => {
        return (
            cur.some((sqrKey) => {
                return (currentPos.current + sqrKey) % width === width - 1;
            }) ||
            cur.some((sqrKey) => {
                return (
                    squares[currentPos.current + sqrKey + 1] ===
                    (
                        <div
                            key={currentPos.current + sqrKey + 1}
                            className="taken"
                        ></div>
                    )
                );
            })
        );
    };
    const tooCloseToEdgeToRotate = (nextRot) => {
        return (
            // Checks if any squares from the next rotation contain both a square on the left and right edges of the grid
            // (which would mean that the next rotation would overflow onto either the previous or next rows)
            nextRot.some((sqrIdx) => {
                if ((currentPos.current + sqrIdx) % width === width - 1) {
                    return nextRot.some((anyOtherSqrIdx) => {
                        return (
                            (currentPos.current + anyOtherSqrIdx) % width === 0
                        );
                    });
                } else if ((currentPos.current + sqrIdx) % width === 0) {
                    return nextRot.some((anyOtherSqrIdx) => {
                        return (
                            (currentPos.current + anyOtherSqrIdx) % width ===
                            width - 1
                        );
                    });
                } else {
                    return false;
                }
            }) ||
            // Checks if any square from the next rotation overlaps with any square that is "taken"
            nextRot.some((sqrKey) => {
                return (
                    squares[currentPos.current + sqrKey].props.className ===
                    "taken"
                );
            })
        );
    };
    const moveDown = () => {
        setSquares((sqrs) => {
            undraw(sqrs);
            currentPos.current += width;
            draw(sqrs);
            freeze(sqrs);
            return [...sqrs];
        });
    };
    const moveLeft = () => {
        setSquares((sqrs) => {
            undraw(sqrs);
            if (!atLeftEdge(currentTetromino.current)) {
                currentPos.current -= 1;
            }
            draw(sqrs);
            return [...sqrs];
        });
    };
    const moveRight = () => {
        setSquares((sqrs) => {
            undraw(sqrs);
            if (!atRightEdge(currentTetromino.current)) {
                currentPos.current += 1;
            }
            draw(sqrs);
            return [...sqrs];
        });
    };
    const rotate = () => {
        setSquares((sqrs) => {
            undraw(sqrs);
            currentRot.current =
                currentRot.current === currentTetromino.current.length - 1
                    ? 0
                    : currentRot.current + 1;
            if (
                !tooCloseToEdgeToRotate(
                    theTetrominoes[random.current][currentRot.current]
                )
            ) {
                console.log("if");
                currentTetromino.current =
                    theTetrominoes[random.current][currentRot.current];
            } else {
                console.log("else");
                currentRot.current =
                    currentRot.current === 0
                        ? currentTetromino.current.length - 1
                        : currentRot.current - 1;
            }
            draw(sqrs);
            return [...sqrs];
        });
    };
    const keyControls = (e) => {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    };
    const startGame = () => {
        window.addEventListener("keydown", keyControls);
        setSquares((sqrs) => {
            draw(sqrs);
            return [...sqrs];
        });
        timer.current = window.setInterval(moveDown, 1000);
    };

    return { squares, startGame };
};

const useSetMinigrid = (nextTetromino) => {};

const useSetScoreboard = (level, score) => {};
