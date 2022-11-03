import "./scoreboard.css";
import { Container } from "../../container/container.js";

export const Scoreboard = (props) => {
    return (
        <Container
            outerStyles={
                !props.startGame
                    ? {
                          borderColor: "rgb(100, 100, 100)",
                          width: "30vmin",
                          height: "51vmin",
                      }
                    : {
                          width: "30vmin",
                          height: "51vmin",
                      }
            }
            innerStyles={
                !props.startGame && {
                    color: "rgba(0, 0, 0, 0.5)",
                }
            }
            innerContent={() => {
                return [
                    <div key="0" className="scoreboard">
                        <div>Score:</div>
                        <span>{props.startGame && props.score}</span>
                    </div>,
                    <div key="1" className="scoreboard">
                        <div>Level:</div>
                        <span>{props.startGame && props.level}</span>
                    </div>,
                ];
            }}
        />
    );
};
