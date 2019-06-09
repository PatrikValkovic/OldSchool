import {Renderer} from "./Renderer";
import {TimeManager} from "./TimeManager";
import {levels} from "./levels";
import {ILevel} from "./ILevel";

export class MyGame {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private render: Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.render = new Renderer(this.context);
    }

    start() {
        const timing = new TimeManager();
        const l = levels();
        let level: ILevel = l.next().value;

        const loop = () => {
            timing.newFrame();
            timing.reportCurrent();
            const delta = timing.delta();

            level.nextFrame();
            level.update(delta);
            level.render(this.render);
            if(level.finished()){
                level = l.next().value;
            }

            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    }
}
