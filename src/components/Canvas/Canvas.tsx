import styles from './Canvas.module.css'
import {RefObject} from "react";

interface CanvasProps {
    battlegroundSize: { width: number; height: number }
    canvasRef: RefObject<HTMLCanvasElement>;
}

function Canvas(props: CanvasProps) {
    const {battlegroundSize, canvasRef} = props

    return (
        <>
            <canvas
                ref={canvasRef}
                width={battlegroundSize.width}
                height={battlegroundSize.height}
                className={styles.canvas}
            />
        </>
    )
}

export default Canvas;