import "../game/grid.css";
import { Container } from "../container/container.js";

export const PauseBtn = (props) => {
    return (
        <Container
            animate={true}
            onclick={() => {
                props.onPauseGame();
            }}
            outerStyles={{
                display: !props.show && "none",
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "5vmin",
                height: "7vmin",
            }}
            innerStyles={{
                padding: "0px",
                width: "100%",
                height: "100%",
                backgroundImage: "linear-gradient(#000, #000)",
                backgroundSize: "0.6vmin 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
            }}
        />
    );
};

export const UnpauseAnimation = (props) => {
    return <div className={props.show ? "animate" : "hide"}>{props.count}</div>;
};

export const Pause = (props) => {
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
                        Paused
                    </div>,
                    <Container
                        key="1"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            props.onResume();
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
                                    Resume
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
                        key="3"
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
