import {Renderer} from "./Renderer";
import {Coordinate, Coordinate3D, Rect} from "./entities";
import generator from "./generator";
import {TimeManager} from "./TimeManager";

export class MyGame {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private render: Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.render = new Renderer(this.context);
    }

    start() {
        const center = new Coordinate(4, 3);
        const word = new Rect(8, 6);
        const distance = 10;
        const timing = new TimeManager();

        let moved = 0;

        const loop = () => {
            timing.newFrame();
            timing.reportLastSecond();
            const delta = timing.delta();

            this.render.newFrame(
                center,
                word,
                distance
            );

            moved += delta;
            this.render.lines(
                generator.world(word.w, word.h, 10, moved),
                1,
                '#000000'
            );
            this.render.lines(
                generator.cube(new Coordinate3D(2,5, 2)),
                1,
                '#FF0000'
            );

            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    }
}
