import "./container.css";
import BgImg from "../background/images/halftone.png";

export const Container = (props) => {
    return (
        <div
            className={props.animate === true ? "container-anim" : "container"}
            style={props.outerStyles}
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
                {props.bgImg === true && (
                    <img className="bgImg" src={BgImg} alt="" />
                )}
                {!(props.innerContent === undefined) && props.innerContent()}
            </div>
        </div>
    );
};

/*
Props:
<Container 
    animate="true" || "false"
    isOffwhite="true" || "false"
    bgImg="true" || "false"
    outerStyles={{width: "", height: ""}} 
    innerStyles={{*styles*}}
    onClick={*function*} 
    innerContent={*function*} />
*/
