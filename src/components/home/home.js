import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect, useMemo } from "react";
import { Effects, OrthographicCamera } from "@react-three/drei";
import { RenderPixelatedPass } from "three/examples/jsm/postprocessing/RenderPixelatedPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { Container } from "../container/container.js";
import { Model } from "./Logo.js";

extend({ RenderPixelatedPass, OutlinePass });

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

    window.addEventListener("mousemove", (e) => {
        updatePos(e.clientX, e.clientY);
    });
    window.addEventListener("mouseout", () => {
        updatePos(0, 0);
    });

    //useEffect(() => {
    //    window.addEventListener("mousemove", (e) => {
    //        updatePos(e.clientX, e.clientY);
    //    });
    //    window.addEventListener("mouseout", () => {
    //        updatePos(0, 0);
    //    });
    //    return () => {
    //        window.removeEventListener("mousemove");
    //        window.removeEventListener("mouseout");
    //    };
    //}, []);

    useFrame(() => {
        easePos();
        groupRef.current.rotation.y = 3.5 * pos.current[0];
        groupRef.current.rotation.x = 3.5 * pos.current[1];
    });

    const { size, scene, camera } = useThree();
    const resolution = useMemo(
        () => new THREE.Vector2(size.width, size.height),
        [size]
    );

    return (
        <group castShadow receiveShadow ref={groupRef} position={[0, 0, -100]}>
            <ambientLight intensity={0.1} />
            <spotLight castShadow intensity={3} position={[0, 0, 450]} />
            <Effects>
                <outlinePass args={[resolution, scene, camera]} />
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
                    <div
                        key="0"
                        style={{
                            display: "block",
                            width: "375px",
                            height: "250px",
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
