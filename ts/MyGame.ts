import {Renderer} from "./Renderer";
import {Coordinate, Coordinate3D, Rect} from "./entities";
import {TimeManager} from "./TimeManager";
import {ColorRenderable, RenderableCube, RocketRenderable, WorldRenderable} from "./RenderableEntities";

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
        const distance = 20;
        const timing = new TimeManager();

        const userCoord = new Coordinate3D();
        this.canvas.addEventListener('mousemove', (e) => {
            //TODO move better
            this.canvas.requestPointerLock();
            userCoord.x += e.movementX / 1000.0;
            userCoord.z -= e.movementY / 1000.0;
        });

        const loop = () => {
            timing.newFrame();
            //timing.reportCurrent();
            const delta = timing.delta();

            this.render.newFrame(
                center,
                word,
                distance
            );

            userCoord.y += delta;
            this.render.render(
                new ColorRenderable(
                    {stroke: '#000000', width: 1},
                    new WorldRenderable(word.w, word.h, 20, 0/*moved*/),
                )
            );
            this.render.render(
                new ColorRenderable(
                    {stroke: '#0000FF'},
                    new RenderableCube(2, 5, 2)
                )
            );
            this.render.render(
                new ColorRenderable(
                    {stroke: '#FF0000', width: 2},
                    new RocketRenderable(userCoord.x, userCoord.y, userCoord.z)
                )
            );

            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    }
}
