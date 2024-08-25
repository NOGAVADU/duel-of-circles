import './App.css'
import {Canvas} from "./components";
import {useCanvas} from "./shared/hooks";
import {useState} from "react";

const battlegroundSize = {width: 960, height: 540}

function App() {
    const canvasRef = useCanvas(draw)
    const [count, setCount] = useState(0)

    function draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, battlegroundSize.width, battlegroundSize.height);
    }

    return (
        <>
            <main className="main">
                <Canvas battlegroundSize={battlegroundSize} canvasRef={canvasRef}/>
            </main>
            <button onClick={() => setCount(count + 1)}>{count} : Принудительных обновлений состояний</button>
            <footer className="footer">
                Мосолов Даниил | tg: @daaaniiiiiil
            </footer>
        </>
    )
}

export default App
