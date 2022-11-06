import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { Container } from "../container/container.js";
import { Model } from "./Logo.js";

export const Logo = () => {
    const groupRef = useRef();
    const pointerPosition = useRef([0, 0]);
    const pos = useRef([0, 0]);
    const changeInPos = useRef([0, 0]);

    const updatePos = (x, y) => {
        // X
        pointerPosition.current[0] = x;
        changeInPos.current[0] =
            (x - window.innerWidth / 2) / ((10 * window.innerWidth) / 2) -
            pos.current[0];

        // Y
        pointerPosition.current[1] = y;
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
            (pointerPosition.current[0] - window.innerWidth / 2) /
                ((10 * window.innerWidth) / 2) -
            changeInPos.current[0];
        pos.current[1] =
            (pointerPosition.current[1] - window.innerHeight / 2) /
                ((10 * window.innerHeight) / 2) -
            changeInPos.current[1];
    };

    window.addEventListener("mousemove", (e) => {
        updatePos(e.clientX, e.clientY);
    });

    useFrame(() => {
        easePos();
        groupRef.current.rotation.y = 2 * pos.current[0];
        groupRef.current.rotation.x = 2 * pos.current[1];
    });

    return (
        <group ref={groupRef} position={[0, 0, -11]}>
            <Model position={[0, 0, 0]} />
        </group>
    );
};

export const Home = (props) => {
    const [level, setLevel] = useState(1);

    return (
        <Container
            isOffwhite={true}
            bgImg={true}
            outerStyles={{
                width: "42.5vmin",
                height: "85vmin",
            }}
            innerStyles={{ flexDirection: "column" }}
            innerContent={() => {
                return [
                    <div key="0" style={{ display: "block" }}>
                        <Canvas>
                            <ambientLight intensity={0.5} />
                            <directionalLight
                                position={[-2, 5, 2]}
                                intensity={1}
                            />
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
                            props.onClickPlay(level);
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
