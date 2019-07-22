import {Renderer} from "./Renderer";
import {TimeManager} from "./TimeManager";
import {levels} from "./levels";
import {ILevel} from "./ILevel";
import {EventEngine} from "./EventEngine";

export class MyGame {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly render: Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.render = new Renderer(this.context);
    }

    start() {
        const timing = new TimeManager();
        const events = new EventEngine();

        events.attach(this.canvas);
        const l = levels();
        let level: ILevel = l.next().value;

        const loop = () => {
            try {
                events.nextFrame();
                events.checkPause();

                timing.newFrame();
                //timing.reportCurrent();
                const delta = timing.delta();

                level.nextFrame();
                level.update(delta, events);
                level.collisions();
                level.render(this.render);
                if (level.finished()) {
                    level = l.next().value;
                }
            }
            catch(e){}
            finally{
                window.requestAnimationFrame(loop)
            }
        };
        window.requestAnimationFrame(loop);
    }
}
