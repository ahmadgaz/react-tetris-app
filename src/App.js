import "./App.css";
import { useState, useRef } from "react";
import { Background } from "./components/background/background.js";
import { Home } from "./components/home/home.js";
import { Grid } from "./components/game/grid/grid.js";
import { Minigrid } from "./components/game/minigrid/minigrid.js";
import { Scoreboard } from "./components/game/scoreboard/scoreboard.js";
import { Pause } from "./components/pause/pause.js";
import { Gameover } from "./components/gameover/gameover.js";

function App() {
    const startGame = useRef(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [minigrid, setMinigrid] = useState();
    const [showHome, setShowHome] = useState(true);
    const [showGrid, setShowGrid] = useState(false);

    const setGame = (lev) => {
        setShowHome((show) => !show);
        setShowGrid((show) => !show);
        setLevel(lev);
        startGame.current = !startGame.current;
    };

    return (
        <div className="App">
            <Background />
            {showHome && <Home value="" onClickPlay={setGame} />}
            {showGrid && (
                <Grid
                    startGame={startGame.current}
                    level={level}
                    onChangeScore={setScore}
                    onChangeLevel={setLevel}
                    onChangeMinigrid={setMinigrid}
                />
            )}
            <div>
                <Minigrid startGame={startGame.current} minigrid={minigrid} />
                <Scoreboard
                    startGame={startGame.current}
                    score={score}
                    level={level}
                />
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
