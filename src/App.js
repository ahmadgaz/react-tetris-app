import "./App.css";
import { useState, useEffect } from "react";
import { Background } from "./background/background.js";
import {
    Home,
    Grid,
    Minigrid,
    Scoreboard,
    Pause,
    PauseBtn,
    UnpauseAnimation,
    GameOver,
} from "./components/gameComponents.js";

function App() {
    const [score, setScore] = useState();
    const [level, setLevel] = useState();
    const [initialLevel, setInitialLevel] = useState();
    const [minigrid, setMinigrid] = useState();
    const [gameState, setGameState] = useState("home");
    const [renderTwice, setRenderTwice] = useState(false);
    const [count, setCount] = useState();

    // STATES
    // MINIGRID AND SCOREBOARD ALWAYS SHOW
    const home = () => {
        setGameState("home");
    };
    const reset = () => {
        setGameState("reset");
    };

    const pause = () => {
        setGameState("pause");
    };

    const unpause = () => {
        setGameState("unpause");
    };

    const unpauseCountdown = () => {
        setCount(3);
        setGameState("unpauseCountdown");
    };

    const over = () => {
        setGameState("over");
    };

    if (renderTwice) {
        unpause();
        setRenderTwice(false);
    }

    if (count > 0) {
        setTimeout(() => {
            setCount((c) => c - 1);
        }, 1000);
    } else if (count === 0) {
        setGameState("unpause");
        setCount((c) => c - 1);
    }

    return (
        <div className="App">
            <Background />
            <Home
                gameState={gameState}
                setLevel={setInitialLevel}
                onPlay={reset}
            />

            <Grid
                gameState={gameState}
                level={initialLevel}
                setScore={setScore}
                setLevel={setLevel}
                setMinigrid={setMinigrid}
                setRenderTwice={setRenderTwice}
                over={over}
            />

            <div>
                <Minigrid gameState={gameState} minigrid={minigrid} />
                <Scoreboard gameState={gameState} score={score} level={level} />
            </div>
            <PauseBtn gameState={gameState} pause={pause} />
            <Pause
                gameState={gameState}
                onResume={unpauseCountdown}
                onRestart={reset}
                onQuit={home}
            />

            <UnpauseAnimation gameState={gameState} count={count} />
            <GameOver gameState={gameState} onRestart={reset} onQuit={home} />
        </div>
    );
}

export default App;
