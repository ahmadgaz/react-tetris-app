import { useState, useEffect, useRef } from "react";
import { useSetGrid } from "../gameInfo.js";
import { Container } from "../../container/container.js";

export const Grid = (props) => {
    const { squares, startGame } = useSetGrid();

    // Skip first render
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current === true) {
            firstRender.current = false;
            return;
        }

        startGame();
        return;
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
            onclick={() => {
                return;
            }}
            innerContent={() => {
                return squares;
            }}
        />
    );
};
