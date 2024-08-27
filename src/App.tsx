import './App.css'
import {Canvas} from "./components";
import {useCanvas, useGameState} from "./shared/hooks";
import DuelantRedactor from "./components/DuelantRedactor/DuelantRedactor.tsx";
import {useState} from "react";
import {DuelantRedactorState, DuelantState} from "./shared/types";

const canvasSize = {width: 960, height: 540}

const getPrettyScore = (score: number) => {
    return score < 10 ? `0${score}` : score;
}

function App() {
    const canvasRef = useCanvas(draw)
    const game = useGameState(openDuelantRedactor);
    const [duelantRedactor, setDuelantRedactor] = useState<DuelantRedactorState>({
        isVisible: false,
        duelant: game.state.duelantLeftState,
        onSubmit: game.setLeftDuelantState,
        onStateUpdate: game.handleAppStateUpdate
    });

    function draw(context: CanvasRenderingContext2D) {
        if (!canvasRef.current) return;

        context.clearRect(0, 0, canvasSize.width, canvasSize.height);

        game.objectsToDraw.forEach(object => {
            object.init(context);
        })
    }

    function openDuelantRedactor(
        duelant: DuelantState,
        setDuelant: (duelant: Partial<DuelantState>) => void
    ) {
        if (!duelantRedactor.isVisible) {
            setDuelantRedactor({
                ...duelantRedactor,
                isVisible: true,
                duelant,
                onSubmit: setDuelant,
            })
            game.handleAppStateUpdate()
        }
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
            {duelantRedactor.isVisible && (<DuelantRedactor state={duelantRedactor} setState={setDuelantRedactor}/>)}

            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
        </>
    )
}

export default App
