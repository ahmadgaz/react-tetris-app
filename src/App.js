import "./App.css";
import { useState } from "react";
import { Background } from "./components/background/background.js";
import { Home } from "./components/home/home.js";
import { Grid } from "./components/game/grid/grid.js";
import { Minigrid } from "./components/game/minigrid/minigrid.js";
import { Scoreboard } from "./components/game/scoreboard/scoreboard.js";
import { Pause } from "./components/pause/pause.js";
import { Gameover } from "./components/gameover/gameover.js";

function App() {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [highScore, setHighScore] = useState(0);
    const [gridHidden, setGridHidden] = useState(true);

    return (
        <div className="App">
            <Background />
            <Home setGridHidden={setGridHidden} setLevel={setLevel} />
            <Grid
                gridHidden={gridHidden}
                setLevel={setLevel}
                setScore={setScore}
            />
            <div>
                <Minigrid />
                <Scoreboard />
            </div>
            {/*
            <Pause setLevel={setLevel} setGridHidden={setGridHidden} />
            <Gameover setLevel={setLevel} setGridHidden={setGridHidden} />
            */}
        </div>
    );
}

export default App;

/*
Global variables:
score
level
high score
leaderboard data

Global functions:

*/
