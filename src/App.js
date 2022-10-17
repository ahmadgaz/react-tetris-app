import "./App.css";
import { useState } from "react";
import { Background } from "./components/background/background.js";
import { Home } from "./components/home/home.js";
import { Grid } from "./components/grid/grid.js";
import { Minigrid } from "./components/minigrid/minigrid.js";
import { Scoreboard } from "./components/scoreboard/scoreboard.js";
import { Pause } from "./components/pause/pause.js";
import { Gameover } from "./components/gameover/gameover.js";

function App() {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gridHidden, setGridHidden] = useState(true);

    const newGame = (lev) => {
        setLevel(lev);
        startGame(lev);
        setGridHidden(false);
        return;
    };

    const startGame = (lev) => {};

    const updateMinigrid = () => {};

    const updateScore = () => {};

    const updateLevel = () => {};

    return (
        <div className="App">
            <Background />
            <Home setNewGameLevel={newGame} />
            <Grid level={level} gridHidden={gridHidden} />
            <div>
                <Minigrid />
                <Scoreboard />
            </div>
            {/*
            <Pause />
            <Gameover />
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
