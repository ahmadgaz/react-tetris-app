import { useState, useEffect, useRef } from "react";
import { useSetGame } from "../gameInfo.js";
import { Container } from "../../container/container.js";

export const Grid = (props) => {
    const { squares, score, level, minigrid, startGame } = useSetGame();

    useEffect(() => {
        if (props.startGame) {
            startGame(props.level);
            props.onChangeScore(score.current);
            props.onChangeMinigrid(minigrid.current);
        }
    }, [props.startGame]);

    useEffect(() => {
        props.onChangeScore(score.current);
    }, [score.current]);

    useEffect(() => {
        props.onChangeLevel(level.current);
    }, [level.current]);

    useEffect(() => {
        props.onChangeMinigrid(minigrid.current);
    }, [minigrid.current]);

    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            outerStyles={{
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
