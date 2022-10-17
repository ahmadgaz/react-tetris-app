import { Container } from "../container/container.js";

export const Pause = () => {
    return (
        <Container
            innerContent={() => {
                return;
            }}
        />
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
