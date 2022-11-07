import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, useMemo } from "react";
import { Effects } from "@react-three/drei";
import { RenderPixelatedPass } from "three/examples/jsm/postprocessing/RenderPixelatedPass.js";
import { Container } from "../container/container.js";
import { Model } from "./Logo.js";

extend({ RenderPixelatedPass });

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

    const { size, scene, camera } = useThree();
    const resolution = useMemo(
        () => new THREE.Vector2(size.width, size.height),
        [size]
    );

    return (
        <group ref={groupRef} position={[0, 0, -11]}>
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
                        <Canvas gl={{ antialias: "false" }}>
                            <ambientLight castShadow={"true"} intensity={1} />
                            <directionalLight
                                castShadow={"true"}
                                position={[0, 5, 5]}
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
