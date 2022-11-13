import "./background.css";
import Gradient from "./images/gradient.png";
import Halftone from "./images/halftone.png";
import Dividers from "./images/dividers.png";

export const Background = () => {
    return (
        <div className="background">
            <img className="gradient" src={Gradient} alt="" />
            <img className="halftone" src={Halftone} alt="" />
            <img className="dividers" src={Dividers} alt="" />
        </div>
    );
};
