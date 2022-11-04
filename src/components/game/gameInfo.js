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
export const useSetGame = () => {
    // Grid
    const [squares, setSquares] = useState([
        ...Array.from(Array(200), (_, i) => (
            <div key={i} className="free"></div>
        )),
        ...Array.from(Array(10), (_, i) => (
            <div key={i + 200} className="taken"></div>
        )),
    ]);

    // Minigrid
    const minigrid = useRef([
        ...Array.from(Array(16), (_, i) => (
            <div key={i} className="miniFree"></div>
        )),
    ]);

    // Values
    const score = useRef(0);
    const level = useRef(1);
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
    const nextTetromino = useRef(
        theTetrominoes[nextRandom.current][currentRot.current]
    );

    // Draw and undraw tetrominos
    const drawMinigrid = () => {
        nextTetromino.current.forEach((sqrkey) => {
            if (sqrkey > 3) {
                sqrkey = (sqrkey % 10) + 4 * Math.floor(sqrkey / 10);
            }
            minigrid.current[sqrkey] = (
                <div key={sqrkey} className="miniTetromino"></div>
            );
        });
    };
    const undrawMinigrid = () => {
        minigrid.current = [
            ...Array.from(Array(16), (_, i) => (
                <div key={i} className="miniFree"></div>
            )),
        ];
    };
    const isRightAboveTakenSquare = (sqrs, cur) => {
        return cur.some((sqrKey) => {
            return (
                sqrs[currentPos.current + sqrKey + width].props.className ===
                "taken"
            );
        });
    };
    const freezeTetromino = (sqrs) => {
        let s = sqrs;
        // Freeze Tetromino
        currentTetromino.current.forEach((sqrkey) => {
            s[currentPos.current + sqrkey] = (
                <div key={currentPos.current + sqrkey} className="taken"></div>
            );
        });
        return s;
    };
    const checkForFullRow = (sqrs) => {
        let s;
        sqrs.every((sqr) => {
            s = [];
            if (
                Number(sqr.key) < 200 &&
                Number(sqr.key) % width === 0 &&
                sqrs
                    .slice(Number(sqr.key), Number(sqr.key) + width)
                    .every((sq) => sq.props.className === "taken")
            ) {
                s.push(
                    ...Array.from(Array(width), (_, i) => (
                        <div key={i} className="free"></div>
                    )),
                    ...Array.from(Array(Number(sqr.key)), (_, i) => (
                        <div
                            key={i + width}
                            className={sqrs[i].props.className}
                        ></div>
                    )),
                    ...Array.from(
                        Array(sqrs.length - Number(sqr.key) - width),
                        (_, i) => (
                            <div
                                key={Number(sqr.key) + width + i}
                                className={
                                    sqrs[Number(sqr.key) + width + i].props
                                        .className
                                }
                            ></div>
                        )
                    )
                );
                score.current += 10;
                if (score % 100 === 0) {
                    level.current =
                        level.current === 5 ? level.current : level.current + 1;
                }
                s = checkForFullRow(s);
                return false;
            }
            s = sqrs;
            return true;
        });
        return s;
    };
    const setNewTetrominoValues = () => {
        random.current = nextRandom.current;
        nextRandom.current = Math.floor(Math.random() * theTetrominoes.length);
        currentRot.current = 0;
        currentTetromino.current =
            theTetrominoes[random.current][currentRot.current];
        undrawMinigrid();
        nextTetromino.current =
            theTetrominoes[nextRandom.current][currentRot.current];
        drawMinigrid();
        currentPos.current = 4;
        //setNextTetromino();
        // add score bs
        // add gameover bs
    };
    const draw = (sqrs) => {
        let s = sqrs;
        // Checks if current position overlaps a taken square
        if (isRightAboveTakenSquare(s, currentTetromino.current)) {
            s = freezeTetromino(s);
            s = checkForFullRow(s);
            setNewTetrominoValues();
        }
        // Draw New Tetromino
        currentTetromino.current.forEach((sqrkey) => {
            s[currentPos.current + sqrkey] = (
                <div
                    key={currentPos.current + sqrkey}
                    className="tetromino"
                ></div>
            );
        });
        return s;
    };
    const undraw = (sqrs) => {
        // Undraw current tetromino
        let s = sqrs;
        currentTetromino.current.forEach((sqrkey) => {
            s[currentPos.current + sqrkey] = (
                <div key={currentPos.current + sqrkey} className="free"></div>
            );
        });
        return s;
    };

    // Move current tetromino around
    const atLeftEdge = (sqrs, cur) => {
        return (
            cur.some((sqrKey) => {
                return (currentPos.current + sqrKey) % width === 0;
            }) ||
            cur.some((sqrKey) => {
                return (
                    sqrs[currentPos.current + sqrKey - 1].props.className ===
                    "taken"
                );
            })
        );
    };
    const atRightEdge = (sqrs, cur) => {
        return (
            cur.some((sqrKey) => {
                return (currentPos.current + sqrKey) % width === width - 1;
            }) ||
            cur.some((sqrKey) => {
                return (
                    sqrs[currentPos.current + sqrKey + 1].props.className ===
                    "taken"
                );
            })
        );
    };
    const tooCloseToEdgeToRotate = (sqrs, nextRot) => {
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
                    sqrs[currentPos.current + sqrKey].props.className ===
                    "taken"
                );
            })
        );
    };
    const moveDown = () => {
        setSquares((sqrs) => {
            sqrs = undraw(sqrs);
            currentPos.current += width;
            sqrs = draw(sqrs);
            return [...sqrs];
        });
    };
    const moveLeft = () => {
        setSquares((sqrs) => {
            sqrs = undraw(sqrs);
            if (!atLeftEdge(sqrs, currentTetromino.current)) {
                currentPos.current -= 1;
            }
            sqrs = draw(sqrs);
            return [...sqrs];
        });
    };
    const moveRight = () => {
        setSquares((sqrs) => {
            sqrs = undraw(sqrs);
            if (!atRightEdge(sqrs, currentTetromino.current)) {
                currentPos.current += 1;
            }
            sqrs = draw(sqrs);
            return [...sqrs];
        });
    };
    const rotate = () => {
        setSquares((sqrs) => {
            sqrs = undraw(sqrs);
            currentRot.current =
                currentRot.current === currentTetromino.current.length - 1
                    ? 0
                    : currentRot.current + 1;
            if (
                !tooCloseToEdgeToRotate(
                    sqrs,
                    theTetrominoes[random.current][currentRot.current]
                )
            ) {
                currentTetromino.current =
                    theTetrominoes[random.current][currentRot.current];
            } else {
                currentRot.current =
                    currentRot.current === 0
                        ? currentTetromino.current.length - 1
                        : currentRot.current - 1;
            }
            sqrs = draw(sqrs);
            return [...sqrs];
        });
    };

    // Keycontrols
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

    const startGame = (lev) => {
        window.addEventListener("keydown", keyControls);
        setSquares((sqrs) => {
            sqrs = draw(sqrs);
            return [...sqrs];
        });
        drawMinigrid();
        level.current = lev;
        timer.current = window.setInterval(
            moveDown,
            1000 - 220 * (level.current - 1)
        );
    };

    return { squares, score, level, minigrid, startGame };
};
