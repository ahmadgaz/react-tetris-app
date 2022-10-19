import { useState } from "react";
import { Container } from "../container/container.js";

export const Home = (props) => {
    const [hidden, setHidden] = useState(false);
    const [level, setLevel] = useState(1);

    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            hidden={hidden}
            outerStyles={{
                width: "42.5vmin",
                height: "85vmin",
            }}
            innerStyles={{ flexDirection: "column" }}
            innerContent={() => {
                return [
                    <Container
                        key="0"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            setHidden((hidden) => !hidden);
                            props.setLevel(level);
                            props.setGridHidden((hidden) => !hidden);
                            return;
                        }}
                        innerContent={() => {
                            return (
                                <div
                                    style={{
                                        display: "table-cell",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Play
                                </div>
                            );
                        }}
                    />,
                    <Container
                        key="1"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            setLevel((level) => (level === 5 ? 1 : level + 1));
                            return;
                        }}
                        innerContent={() => {
                            return (
                                <div
                                    style={{
                                        display: "table-cell",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Level: {level}
                                </div>
                            );
                        }}
                    />,
                ];
            }}
        />
    );
};
