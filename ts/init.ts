export function init(canvasId: string): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);

    const recompute = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    recompute();
    window.addEventListener('resize', recompute);

    return canvas;
}

