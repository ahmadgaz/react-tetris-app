import "./gameStyles.css";
import { useState, useRef, useEffect, useMemo } from "react";
import { useSetGame } from "./gameState.js";
import { Container } from "./container.js";
// THREE.JS IMPORTS
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Effects, OrthographicCamera } from "@react-three/drei";
import { RenderPixelatedPass } from "three/examples/jsm/postprocessing/RenderPixelatedPass.js";
import { Model } from "./Logo.js";

extend({ RenderPixelatedPass });

// LOGO USING THREE.JS
export const Logo = () => {
    const groupRef = useRef();
    const rawPointerCoordinates = useRef([0, 0]);
    const pos = useRef([0, 0]);
    const changeInPos = useRef([0, 0]);

    const updatePos = (x, y) => {
        // X
        rawPointerCoordinates.current[0] = x;
        changeInPos.current[0] =
            (x - window.innerWidth / 2) / ((10 * window.innerWidth) / 2) -
            pos.current[0];

        // Y
        rawPointerCoordinates.current[1] = y;
        changeInPos.current[1] =
            (y - window.innerHeight / 2) / ((10 * window.innerHeight) / 2) -
            pos.current[1];
    };

    const approachZero = (val) => {
        if (val > 0.001 || val < -0.001) {
            return val / 1.2;
        } else {
            return 0;
        }
    };

    const easePos = () => {
        changeInPos.current[0] = approachZero(changeInPos.current[0]);
        changeInPos.current[1] = approachZero(changeInPos.current[1]);
        pos.current[0] =
            (rawPointerCoordinates.current[0] - window.innerWidth / 2) /
                ((10 * window.innerWidth) / 2) -
            changeInPos.current[0];
        pos.current[1] =
            (rawPointerCoordinates.current[1] - window.innerHeight / 2) /
                ((10 * window.innerHeight) / 2) -
            changeInPos.current[1];
    };
    const { size, scene, camera } = useThree();
    const resolution = useMemo(
        () => new THREE.Vector2(size.width, size.height),
        [size]
    );
    const scale = useRef(
        Math.min(window.innerHeight / 1000, window.innerWidth / 1000)
    );

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            updatePos(e.clientX, e.clientY);
        });
        window.addEventListener("mouseout", () => {
            updatePos(0, 0);
        });
        window.addEventListener("resize", () => {
            scale.current = Math.min(
                window.innerHeight / 1000,
                window.innerWidth / 1000
            );
        });
        return () => {
            window.removeEventListener("mousemove", (e) => {
                updatePos(e.clientX, e.clientY);
            });
            window.removeEventListener("mouseout", () => {
                updatePos(0, 0);
            });
            window.removeEventListener("resize", () => {
                scale.current = Math.min(
                    window.innerHeight / 1000,
                    window.innerWidth / 1000
                );
            });
        };
    }, []);

    useFrame(() => {
        easePos();
        groupRef.current.rotation.y = 3.5 * pos.current[0];
        groupRef.current.rotation.x = 3.5 * pos.current[1];
    });

    return (
        <group
            castShadow
            receiveShadow
            ref={groupRef}
            scale={scale.current}
            position={[0, 0, -100]}
        >
            <ambientLight intensity={0.1} />
            <spotLight castShadow intensity={3} position={[0, 0, 450]} />
            <Effects>
                <renderPixelatedPass
                    args={[
                        resolution,
                        2,
                        scene,
                        camera,
                        { normalEdgeStrength: "1", depthEdgeStrength: "1" },
                    ]}
                />
            </Effects>
            <mesh receiveShadow>
                <planeGeometry args={[500, 500]} />
                <shadowMaterial opacity={0.2} />
            </mesh>
            <Model position={[0, 0, 0]} />
        </group>
    );
};

// HOME COMPONENT
export const Home = (props) => {
    const [lev, setLev] = useState(1);

    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            outerStyles={{
                display: !(props.gameState === "home") && "none",
                width: "42.5vmin",
                height: "85vmin",
            }}
            innerStyles={{ flexDirection: "column" }}
            innerContent={() => {
                return [
                    <div
                        key="0"
                        style={{
                            display: "block",
                            width: "35vmin",
                            height: "25vmin",
                        }}
                    >
                        <Canvas gl={{ antialias: "false" }} shadows>
                            <OrthographicCamera makeDefault />
                            <Logo />
                        </Canvas>
                    </div>,
                    <Container
                        key="1"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            props.setLevel(lev);
                            props.onPlay();
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
                        key="2"
                        animate={true}
                        innerStyles={{
                            display: "table",
                            textAlign: "center",
                        }}
                        onclick={() => {
                            setLev((l) => (l === 5 ? 1 : l + 1));
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
                                    Level: {lev}
                                </div>
                            );
                        }}
                    />,
                ];
            }}
        />
    );
};

// GRID COMPONENT
export const Grid = (props) => {
    const { squares, score, level, minigrid, gameOver, setGameState } =
        useSetGame();
    const skipFirstRender = useRef(true);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        setGameState(props.gameState, props.level);
        if (props.gameState === "reset") {
            props.setRenderTwice(true);
        }
    }, [props.gameState]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        props.setScore(score.current);
    }, [score.current]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        props.setLevel(level.current);
    }, [level.current]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        props.setMinigrid(minigrid.current);
    }, [minigrid.current]);

    useEffect(() => {
        if (skipFirstRender.current) {
            return;
        }
        if (gameOver.current === true) {
            props.over();
        }
    }, [gameOver.current]);

    useEffect(() => {
        skipFirstRender.current = false;
    }, []);

    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            outerStyles={{
                display:
                    !(
                        props.gameState === "reset" ||
                        props.gameState === "pause" ||
                        props.gameState === "unpause" ||
                        props.gameState === "unpauseCountdown" ||
                        props.gameState === "over"
                    ) && "none",
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

// MINIGRID COMPONENT
export const Minigrid = (props) => {
    return (
        <Container
            outerStyles={
                !(
                    props.gameState === "reset" ||
                    props.gameState === "pause" ||
                    props.gameState === "unpause" ||
                    props.gameState === "unpauseCountdown" ||
                    props.gameState === "over"
                )
                    ? {
                          borderColor: "rgb(65, 65, 65)",
                          minWidth: "30vmin",
                          minHeight: "30vmin",
                          maxWidth: "30vmin",
                          maxHeight: "30vmin",
                      }
                    : {
                          minWidth: "30vmin",
                          minHeight: "30vmin",
                          maxWidth: "30vmin",
                          maxHeight: "30vmin",
                      }
            }
            innerStyles={
                !(
                    props.gameState === "reset" ||
                    props.gameState === "pause" ||
                    props.gameState === "unpause" ||
                    props.gameState === "unpauseCountdown" ||
                    props.gameState === "over"
                )
                    ? {
                          color: "rgba(0, 0, 0, 0.65)",
                          padding: "0px",
                          width: "100%",
                          height: "100%",
                      }
                    : { padding: "0px", width: "100%", height: "100%" }
            }
            onClick={() => {
                return;
            }}
            innerContent={() => {
                return (
                    <div
                        style={{
                            width: "70%",
                            height: "70%",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {props.minigrid}
                    </div>
                );
            }}
        />
    );
};

// SCOREBOARD COMPONENT
export const Scoreboard = (props) => {
    return (
        <Container
            outerStyles={
                !(
                    props.gameState === "reset" ||
                    props.gameState === "pause" ||
                    props.gameState === "unpause" ||
                    props.gameState === "unpauseCountdown" ||
                    props.gameState === "over"
                )
                    ? {
                          borderColor: "rgb(65, 65, 65)",
                          width: "30vmin",
                          height: "51vmin",
                      }
                    : {
                          width: "30vmin",
                          height: "51vmin",
                      }
            }
            innerStyles={
                !(
                    props.gameState === "reset" ||
                    props.gameState === "pause" ||
                    props.gameState === "unpause" ||
                    props.gameState === "unpauseCountdown" ||
                    props.gameState === "over"
                ) && {
                    color: "rgba(0, 0, 0, 0.65)",
                }
            }
            innerContent={() => {
                return [
                    <div key="0" className="scoreboard">
                        <div>Score:</div>
                        <span>
                            {(props.gameState === "reset" ||
                                props.gameState === "pause" ||
                                props.gameState === "unpause" ||
                                props.gameState === "unpauseCountdown" ||
                                props.gameState === "over") &&
                                props.score}
                        </span>
                    </div>,
                    <div key="1" className="scoreboard">
                        <div>Level:</div>
                        <span>
                            {(props.gameState === "reset" ||
                                props.gameState === "pause" ||
                                props.gameState === "unpause" ||
                                props.gameState === "unpauseCountdown" ||
                                props.gameState === "over") &&
                                props.level}
                        </span>
                    </div>,
                ];
            }}
        />
    );
};

// PAUSEBTN COMPONENT
export const PauseBtn = (props) => {
    return (
        <Container
            animate={true}
            onclick={() => {
                props.pause();
            }}
            outerStyles={{
                display:
                    !(
                        props.gameState === "reset" ||
                        props.gameState === "pause" ||
                        props.gameState === "unpause" ||
                        props.gameState === "unpauseCountdown" ||
                        props.gameState === "over"
                    ) && "none",
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

// PAUSE COMPONENT
export const Pause = (props) => {
    return [
        <div
            key="0"
            style={{
                display: !(props.gameState === "pause") && "none",
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
                display: !(props.gameState === "pause") && "none",
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

// UNPAUSE ANIMATION COMPONENT
export const UnpauseAnimation = (props) => {
    return (
        <div
            className={
                props.gameState === "unpauseCountdown" ? "animate" : "hide"
            }
        >
            {props.count}
        </div>
    );
};

// GAMEOVER COMPONENT
export const GameOver = (props) => {
    return [
        <div
            key="0"
            style={{
                display: !(props.gameState === "over") && "none",
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
                display: !(props.gameState === "over") && "none",
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
