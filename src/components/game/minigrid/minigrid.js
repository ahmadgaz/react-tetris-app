import { Container } from "../../container/container.js";

export const Minigrid = (props) => {
    return (
        <Container
            outerStyles={
                !props.startGame
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
                !props.startGame
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
