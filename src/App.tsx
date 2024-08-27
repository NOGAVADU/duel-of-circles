import './App.css'
import {Canvas, DuelantSliders, DuelantRedactor} from "./components";
import {useCanvas, useGame} from "./shared/hooks";
import {useState} from "react";

const canvasSize = {width: 960, height: 540}

const getPrettyScore = (score: number) => {
    return score < 10 ? `0${score}` : score;
}

function App() {
    const canvasRef = useCanvas(draw)
    const game = useGame({
        onLeftDuelantClick: openDuelantLeftRedactor,
        onRightDuelantClick: openDuelantRightRedactor,
    });
    const [isDuelantLeftRedactorVisible, setIsDuelantLeftRedactorVisible] = useState(false)
    const [isDuelantRightRedactorVisible, setIsDuelantRightRedactorVisible] = useState(false)

    function draw(context: CanvasRenderingContext2D) {
        if (!canvasRef.current) return;

        context.clearRect(0, 0, canvasSize.width, canvasSize.height);

        game.objectsToDraw.forEach(object => {
            object.init(context);
        })
    }

    function openDuelantLeftRedactor() {
        setIsDuelantLeftRedactorVisible(true);
        game.handleAppStateUpdate()
    }

    function openDuelantRightRedactor() {
        setIsDuelantRightRedactorVisible(true)
        game.handleAppStateUpdate()
    }

    function closeDuelantLeftRedactor() {
        setIsDuelantLeftRedactorVisible(false)
        game.handleAppStateUpdate()
    }

    function closeDuelantRightRedactor() {
        setIsDuelantRightRedactorVisible(false)
        game.handleAppStateUpdate()
    }

    return (
        <>
            <main className="main">
                <div className='battleground'>
                    <aside className='aside'>
                        <div className='score'>
                            {getPrettyScore(game.state.score.leftDuelantScore)}
                        </div>
                        <DuelantRedactor
                            isVisible={isDuelantLeftRedactorVisible}
                            onClose={closeDuelantLeftRedactor}
                            duelant={game.state.duelantLeftState}
                            handleChange={game.setLeftDuelantState}
                        />
                        <DuelantSliders
                            duelant={game.state.duelantLeftState}
                            handleChange={game.setLeftDuelantState}
                        />
                    </aside>
                    <Canvas canvasSize={canvasSize} canvasRef={canvasRef}/>
                    <aside className='aside'>
                        <div className='score'>
                            {getPrettyScore(game.state.score.rightDuelantScore)}
                        </div>
                        <DuelantRedactor
                            isVisible={isDuelantRightRedactorVisible}
                            onClose={closeDuelantRightRedactor}
                            duelant={game.state.duelantRightState}
                            handleChange={game.setRightDuelantState}
                        />
                        <DuelantSliders
                            duelant={game.state.duelantRightState}
                            handleChange={game.setRightDuelantState}
                        />
                    </aside>
                </div>
            </main>


            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
        </>
    )
}

export default App
