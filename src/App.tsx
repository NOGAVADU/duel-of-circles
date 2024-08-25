import './App.css'
import {Canvas} from "./components";
import {useCanvas} from "./shared/hooks";
import {useState} from "react";

const canvasSize = {width: 960, height: 540}

function App() {
    const canvasRef = useCanvas(draw)
    const [count, setCount] = useState(0)

    function draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }

    return (
        <>
            <main className="main">
                <Canvas canvasSize={canvasSize} canvasRef={canvasRef}/>
            </main>
            <button onClick={() => setCount(count + 1)}>{count} : Принудительных обновлений состояний</button>
            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
        </>
    )
}
export default App
