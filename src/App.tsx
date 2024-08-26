import './App.css'
import {Canvas} from "./components";
import {useCanvas, useGameState} from "./shared/hooks";

const canvasSize = {width: 960, height: 540}

function App() {
    const canvasRef = useCanvas(draw)
    const game = useGameState()

    function draw(context: CanvasRenderingContext2D) {
        if (!canvasRef.current) return;

        context.clearRect(0, 0, canvasSize.width, canvasSize.height);

        game.objectsToDraw.forEach(object => {
            object.init(context);
        })
    }

    return (
        <>
            <main className="main">
                <Canvas canvasSize={canvasSize} canvasRef={canvasRef}/>
                <div>{`${game.state.score.leftDuelantScore} / ${game.state.score.rightDuelantScore}`}</div>
            </main>
            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
        </>
    )
}

export default App
