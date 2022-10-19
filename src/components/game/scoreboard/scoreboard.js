import "./scoreboard.css";
import { Container } from "../../container/container.js";

export const Scoreboard = () => {
    return (
        <Container
            hidden={false}
            outerStyles={{
                width: "30vmin",
                height: "51vmin",
            }}
            innerContent={() => {
                return [
                    <div key="0" className="light">
                        Score:
                    </div>,
                    <div key="1" className="dark">
                        Level:
                    </div>,
                ];
            }}
        />
    );
};
