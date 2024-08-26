import './App.css'
import {Canvas} from "./components";
import {DuelantState, useCanvas, useGameState} from "./shared/hooks";
import DuelantRedactor from "./components/DuelantRedactor/DuelantRedactor.tsx";
import {useState} from "react";

const canvasSize = {width: 960, height: 540}

function App() {
    const canvasRef = useCanvas(draw)
    const [isRedactorVisible, setIsRedactorVisible] = useState<boolean>(true);
    const [duelantToRedact, setDuelantToRedact] = useState<DuelantState | null>(null);
    const game = useGameState(redactDuelant)

    function draw(context: CanvasRenderingContext2D) {
        if (!canvasRef.current) return;

        context.clearRect(0, 0, canvasSize.width, canvasSize.height);

        game.objectsToDraw.forEach(object => {
            object.init(context);
        })
    }

    function redactDuelant(duelant: DuelantState) {
        setIsRedactorVisible(true);
        setDuelantToRedact(duelant);
    }

    return (
        <>
            <main className="main">
                <div className='battleground'>
                    <div
                        className='score'>
                        {game.state.score.leftDuelantScore < 10 ?
                            `0${game.state.score.leftDuelantScore}` :
                            game.state.score.leftDuelantScore
                        }
                    </div>
                    <Canvas canvasSize={canvasSize} canvasRef={canvasRef}/>
                    <div
                        className='score'>
                        {game.state.score.rightDuelantScore < 10 ?
                            `0${game.state.score.rightDuelantScore}` :
                            game.state.score.rightDuelantScore
                        }
                    </div>
                </div>
            </main>

            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
            {isRedactorVisible && (
                <DuelantRedactor
                    duelant={duelantToRedact ?? game.state.duelantLeftState}
                    setIsRedactorVisible={setIsRedactorVisible}
                />)}
        </>
    )
}

export default App
