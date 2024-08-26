import './App.css'
import {Canvas} from "./components";
import {useCanvas, useGameState} from "./shared/hooks";
import DuelantRedactor from "./components/DuelantRedactor/DuelantRedactor.tsx";
import {useState} from "react";

const canvasSize = {width: 960, height: 540}

const getPrettyScore = (score: number) => {
    return score < 10 ? `0${score}` : score;
}

function App() {
    const canvasRef = useCanvas(draw)
    const game = useGameState(redactLeftDuelant, redactRightDuelant);
    const [redactorState, setRedactorState] = useState({
        isRedactorVisible: false,
        duelantToRedact: game.state.duelantLeftState,
        onSave: game.setLeftDuelantState
    });

    function draw(context: CanvasRenderingContext2D) {
        if (!canvasRef.current) return;

        context.clearRect(0, 0, canvasSize.width, canvasSize.height);

        game.objectsToDraw.forEach(object => {
            object.init(context);
        })
    }

    function redactLeftDuelant() {
        setRedactorState({
            isRedactorVisible: true,
            duelantToRedact: game.state.duelantLeftState,
            onSave: game.setLeftDuelantState,
        })
    }

    function redactRightDuelant() {
        setRedactorState({
            isRedactorVisible: true,
            duelantToRedact: game.state.duelantRightState,
            onSave: game.setRightDuelantState,
        })
    }

    return (
        <>
            <main className="main">
                <div className='battleground'>
                    <div className='score'>
                        {getPrettyScore(game.state.score.leftDuelantScore)}
                    </div>
                    <Canvas canvasSize={canvasSize} canvasRef={canvasRef}/>
                    <div className='score'>
                        {getPrettyScore(game.state.score.rightDuelantScore)}
                    </div>
                </div>
            </main>

            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
            {redactorState.isRedactorVisible && (
                <DuelantRedactor redactorState={redactorState} setRedactorState={setRedactorState}/>)}
        </>
    )
}

export default App
