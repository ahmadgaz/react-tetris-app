import "../game/grid.css";
import { Container } from "../container/container.js";

export const Gameover = (props) => {
    return [
        <div
            key="0"
            style={{
                display: !props.show && "none",
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                opacity: "50%",
            }}
        ></div>,
        <Container
            key="1"
            isOffwhite={true}
            bgImg={true}
            outerStyles={{
                display: !props.show && "none",
                position: "absolute",
                width: "21.25vmin",
                height: "60vmin",
            }}
            innerStyles={{ flexDirection: "column", flexWrap: "nowrap" }}
            innerContent={() => {
                return [
                    <div key="0" style={{ margin: "2vmin" }}>
                        Game Over :P
                    </div>,
                    <Container
                        key="1"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            props.onRestart();
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
                                    Restart
                                </div>
                            );
                        }}
                    />,
                    <Container
                        key="2"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            props.onQuit();
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
                                    Quit
                                </div>
                            );
                        }}
                    />,
                ];
            }}
        />,
    ];
};
