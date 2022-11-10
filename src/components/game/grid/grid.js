import { useState, useEffect, useRef } from "react";
import { useSetGame } from "../gameInfo.js";
import { Container } from "../../container/container.js";

export const Grid = (props) => {
    const {
        squares,
        score,
        level,
        minigrid,
        gameover,
        startGame,
        endGame,
        pauseGame,
        unpauseGame,
    } = useSetGame();

    const initialLevel = useRef(props.level);
    const skipFirstRender = useRef(true);
    const restart = useRef(false);
    const quit = useRef(false);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        if (props.startGame) {
            initialLevel.current = props.level;
            startGame(initialLevel.current);
            props.onChangeScore(score.current);
            props.onChangeMinigrid(minigrid.current);
        } else if (!props.startGame) {
            endGame(initialLevel.current);
            props.onChangeLevel(initialLevel.current);
        }
    }, [props.startGame]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }

        console.log("test");
        props.onRestart();
    }, [props.restartSwitch]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
    }, [props.quitSwitch]);
    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }

        if (gameover.current) {
            props.onGameOver(true);
        }
    }, [gameover.current]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }

        console.log(restart.current + " " + props.restartSwitch);
        if (restart.current !== props.restartSwitch) {
            restart.current = props.restartSwitch;
            return;
        }
        if (quit.current !== props.quitSwitch) {
            quit.current = props.quitSwitch;
            return;
        }
        if (props.pauseGame) {
            pauseGame();
        } else if (!props.pauseGame) {
            unpauseGame();
        }
    }, [props.pauseGame]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        props.onChangeScore(score.current);
    }, [score.current]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        props.onChangeLevel(level.current);
    }, [level.current]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        props.onChangeMinigrid(minigrid.current);
    }, [minigrid.current, props.startGame]);

    useEffect(() => {
        skipFirstRender.current = false;
    }, []);
    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            outerStyles={{
                display: !props.show && "none",
                minWidth: "42.5vmin",
                minHeight: "85vmin",
                maxWidth: "42.5vmin",
                maxHeight: "85vmin",
            }}
            innerStyles={{ padding: "0px", width: "100%", height: "100%" }}
            onclick={() => {
                return;
            }}
            innerContent={() => {
                return squares;
            }}
        />
    );
};
