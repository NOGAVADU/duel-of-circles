import {useEffect, useRef} from "react";

export function useCanvas(draw: (ctx: CanvasRenderingContext2D) => void) {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas: HTMLCanvasElement = canvasRef.current
        const context = canvas.getContext('2d')

        let animationFrameId: number;

        const render = () => {
            if (!context) return;

            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}