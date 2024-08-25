import styles from './Canvas.module.css'
import {RefObject} from "react";

interface CanvasProps {
    canvasSize: { width: number; height: number }
    canvasRef: RefObject<HTMLCanvasElement>;
}

function Canvas(props: CanvasProps) {
    const {canvasSize, canvasRef} = props

    return (
        <>
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className={styles.canvas}
            />
        </>
    )
}

export default Canvas;