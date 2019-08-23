import {ILevel} from "./ILevel";
import {Renderer} from "../Renderer";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {EventEngine} from "../EventEngine";
import {StyleRenderable} from "../renderables/StyleRenderable";
import {GameRocket} from "../entities/GameRocket";
import {CollisionEngine} from "../CollisionEngine";
import {GameWorld} from "../entities/GameWorld";
import {Collisionable} from "../ColliderEntities";
import {GameEnd} from "../entities/GameEnd";
import {GamePyramid} from "../entities/GamePyramid";

export class Level07 implements ILevel {

    private readonly center = new Coordinate(4, 3);
    private readonly distance = 10;
    private readonly viewDistance = 20;
    private readonly collisionEngine = new CollisionEngine();
    private levelRunning: boolean = true;

    private user = new GameRocket(new Coordinate3D(5, 0, 0.000001));
    private world = new GameWorld(new Coordinate3D(10, 90, 8));
    private end = new GameEnd(60);
    private obstacles = [
        new GamePyramid(0, 3, 0, 2, 2, 2),
        new GamePyramid(6, 7, 0, 3, 1, 1),
        new GamePyramid(2, 9, 0, 2, 2, 3),
        new GamePyramid(7, 9, 0, 2, 2, 4),
        new GamePyramid(0, 13, 0, 1, 1, 3),
        new GamePyramid(1, 15, 0, 1, 1, 1),
        new GamePyramid(2, 17, 0, 1, 1, 2),
        new GamePyramid(3, 19, 0, 1, 1, 1),
        new GamePyramid(6, 13, 0, 3, 2, 4),
        new GamePyramid(8, 18, 0, 1, 1, 2),
        new GamePyramid(7, 20, 0, 1, 1, 3),
        new GamePyramid(0, 23, 0, 2, 3, 7),
        new GamePyramid(5, 23, 0, 3, 3, 7),
        new GamePyramid(1, 27, 0, 1, 1, 6),
        new GamePyramid(2, 29, 0, 1, 1, 5),
        new GamePyramid(3, 31, 0, 1, 1, 6),
        new GamePyramid(8, 27, 0, 1, 1, 6),
        new GamePyramid(7, 29, 0, 1, 1, 4),
        new GamePyramid(6, 31, 0, 1, 1, 5),
        new GamePyramid(1, 34, 0, 2, 1, 1),
        new GamePyramid(3, 36, 0, 2, 1, 1),
        new GamePyramid(5, 38, 0, 2, 1, 2),
        new GamePyramid(0, 38, 0, 3, 3, 7),
        new GamePyramid(2, 41, 0, 1, 3, 3),
        new GamePyramid(5, 43, 0, 5, 3, 8),
        new GamePyramid(5, 46, 0, 1, 1, 7),
        new GamePyramid(4, 47, 0, 1, 1, 7),
        new GamePyramid(3, 48, 0, 1, 1, 6),
        new GamePyramid(6, 49, 0, 2, 2, 6),
        new GamePyramid(8, 50, 0, 2, 2, 7),
        new GamePyramid(0, 50, 0, 2, 2, 5),
        new GamePyramid(1, 51, 0, 1, 1, 4),
        new GamePyramid(0, 52, 0, 2, 2, 6),
        new GamePyramid(1, 55, 0, 1, 1, 7),
        new GamePyramid(2, 55, 0, 2, 2, 8),
        new GamePyramid(4, 53, 0, 2, 2, 4),
    ];


    constructor() {
        this.collisionEngine.addStatic(...this.obstacles.map(o => o.getColliders()));
        this.collisionEngine.addStatic(this.world.getColliders());
        this.collisionEngine.addStatic(this.end.getColliders());
        this.collisionEngine.addDynamic(this.user.getColliders());

        this.collisionEngine.addListener(GameRocket, GameWorld,
            (rocket: Collisionable<GameRocket>) => {
                const ypos = rocket.o.state.coords.y;
                rocket.o.rollbackState();
                rocket.o.state.coords.y = ypos;
            });
        this.collisionEngine.addListener(GameRocket, GameEnd, () => this.levelRunning = false);
        this.collisionEngine.addListener(GameRocket, GamePyramid,
            () => {
                console.log("Game end")
            });
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        this.user.state.coords.y += delta;
        this.user.state.coords.x += events.getState().horizontalMovement * delta;
    }

    collisions(): void {
        this.collisionEngine.checkDynamicStatic();

        this.user.applyState();
    }

    render(renderer: Renderer): void {
        const viewStart = this.user.state.coords.y - 2;
        renderer.newFrame(
            this.center,
            new Rect(this.world.state.size.x, this.world.state.size.z),
            this.distance,
            viewStart,
            this.viewDistance
        );

        renderer.render(
            new StyleRenderable(
                {stroke: '#000000', width: 1},
                this.world.getRenderable(viewStart),
            )
        );

        renderer.render(
            new StyleRenderable(
                {fill: 'rgba(157,255,129, 0.6)'},
                this.end.getRenderable()
            )
        );

        renderer.setStyle({stroke: '#2e70ff'});
        this.obstacles.filter(o => o.isVisible(viewStart, this.viewDistance))
            .map(o => o.getRenderable())
            .forEach(r => renderer.render(r));

        renderer.render(
            new StyleRenderable(
                {stroke: '#FF0000', width: 2},
                this.user.getRenderable()
            )
        );
    }

    finished(): boolean {
        return !this.levelRunning;
    }

}
