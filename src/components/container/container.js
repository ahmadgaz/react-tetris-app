import "./container.css";
import { useMemo } from "react";
import BgImg from "../background/images/halftone.png";

export const Container = (props) => {
    const bgImg = () => {
        if (props.bgImg === true) {
            return <img className="bgImg" src={BgImg} />;
        } else {
            return null;
        }
    };

    return (
        <div
            className={props.animate === true ? "container-anim" : "container"}
            style={
                props.hidden === true
                    ? { ...props.outerStyles, display: "none" }
                    : props.outerStyles
            }
            onClick={() => {
                if (props.onclick instanceof Function) {
                    props.onclick();
                }
            }}
        >
            <div
                className="container-face"
                style={
                    props.isOffwhite === true
                        ? {
                              ...props.innerStyles,
                              backgroundColor: "#f8f0e3",
                          }
                        : { ...props.innerStyles, backgroundColor: "white" }
                }
            >
                {useMemo(() => bgImg(), [props.bgImg])}
                {props.innerContent()}
            </div>
        </div>
    );
};

/*
Props:
<Container 
    animate="true || false"
    isOffwhite="true || false"
    bgImg="true || false"
    hidden="true || false"
    cells=">1"
    outerStyles={{width: "", height: ""}} 
    innerStyles={{*styles*}}
    onClick={*function*} 
    innerContent={*function*} />
*/
