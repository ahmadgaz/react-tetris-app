import "./App.css";
import { useState, useRef } from "react";
import { Background } from "./components/background/background.js";
import { Home } from "./components/home/home.js";
import { Grid } from "./components/game/grid/grid.js";
import { Minigrid } from "./components/game/minigrid/minigrid.js";
import { Scoreboard } from "./components/game/scoreboard/scoreboard.js";
import { Pause, PauseBtn, UnpauseAnimation } from "./components/pause/pause.js";
import { Gameover } from "./components/gameover/gameover.js";

function App() {
    const startGame = useRef(false);
    const pauseGame = useRef(false);
    const restartSwitch = useRef(false);
    const quitSwitch = useRef(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [minigrid, setMinigrid] = useState();
    const [showHome, setShowHome] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [showPause, setShowPause] = useState(false);
    const [showPauseBtn, setShowPauseBtn] = useState(false);
    const [count, setCount] = useState(-1);
    const [playAnimation, setPlayAnimation] = useState(false);
    const [showGameover, setShowGameover] = useState(false);

    const setGame = () => {
        setShowHome((show) => !show);
        setShowGrid((show) => !show);
        setShowPauseBtn(true);
        startGame.current = !startGame.current;
    };

    const endGame = () => {
        setShowHome((show) => !show);
        setShowGrid((show) => !show);
        setShowPauseBtn(false);
        pauseGame.current = !pauseGame.current;
        startGame.current = !startGame.current;
    };

    const restartGame = () => {
        endGame();
        setShowPause(false);
        setShowGameover(false);
        restartSwitch.current = !restartSwitch.current;
    };

    const quitGame = () => {
        endGame();
        setShowPause(false);
        setShowGameover(false);
        quitSwitch.current = !quitSwitch.current;
    };

    if (count > 0) {
        setTimeout(() => {
            setCount((c) => c - 1);
        }, 1000);
    } else if (count === 0) {
        setPlayAnimation(false);
        setCount((c) => c - 1);
    }

    const setPauseGame = () => {
        if (showPause) {
            setPlayAnimation(true);
            setCount(3);
        }
        setShowPause((show) => !show);
        pauseGame.current = !pauseGame.current;
    };

    return (
        <div className="App">
            <Background />
            <Home
                show={showHome}
                level={level}
                onChangeLevel={setLevel}
                onClickPlay={setGame}
            />

            <Grid
                show={showGrid}
                pauseGame={pauseGame.current}
                startGame={startGame.current}
                restartSwitch={restartSwitch.current}
                quitSwitch={quitSwitch.current}
                level={level}
                onChangeScore={setScore}
                onChangeLevel={setLevel}
                onChangeMinigrid={setMinigrid}
                onGameOver={(bool) => {
                    pauseGame.current = false;
                    setShowGameover(bool);
                }}
                onRestart={() => {
                    pauseGame.current = false;
                    setGame();
                }}
            />

            <div>
                <Minigrid startGame={startGame.current} minigrid={minigrid} />
                <Scoreboard
                    startGame={startGame.current}
                    score={score}
                    level={level}
                />
            </div>
            <PauseBtn show={showPauseBtn} onPauseGame={setPauseGame} />
            <Pause
                show={showPause}
                onResume={setPauseGame}
                onRestart={restartGame}
                onQuit={quitGame}
            />

            <UnpauseAnimation show={playAnimation} count={count} />
            <Gameover
                show={showGameover}
                onRestart={restartGame}
                onQuit={quitGame}
            />
        </div>
    );
}

export default App;
