export function getCanvasMouseCoords(canvas: HTMLCanvasElement) {
    const mouseCoords: { x: number, y: number } = {x: 0, y: 0}

    const getMouseCoords = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (rect) {
            mouseCoords.x = e.clientX - rect.left;
            mouseCoords.y = e.clientY - rect.top;
        }
    }

    canvas.addEventListener("mousemove", getMouseCoords)
    canvas.addEventListener("mouseout", () => {
        canvas.removeEventListener("mousemove", getMouseCoords)
    })

    return mouseCoords
}