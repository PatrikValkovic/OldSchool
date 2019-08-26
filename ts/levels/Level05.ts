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
import {sound} from "../SoundEngine";

export class Level05 implements ILevel {

    private center = new Coordinate(4, 3);
    private distance = 10;
    private readonly viewDistance = 20;
    private levelRunning: boolean = true;

    private user = new GameRocket();
    private world = new GameWorld(new Coordinate3D(8, 50, 6));
    private end = new GameEnd(30);

    private collisionEngine = new CollisionEngine();

    constructor() {
        sound().playBackground();

        this.user.state.coords.x = 4;
        this.user.state.coords.y = 0;
        this.user.state.coords.z = 0.00000001;

        this.collisionEngine.addStatic(this.world.getColliders());
        this.collisionEngine.addStatic(this.end.getColliders());
        this.collisionEngine.addDynamic(this.user.getColliders());

        this.collisionEngine.addListener(GameRocket, GameWorld,
            (rocket: Collisionable<GameRocket>, world: Collisionable<GameWorld>) => {
                const ypos = rocket.o.state.coords.y;
                rocket.o.rollbackState();
                rocket.o.state.coords.y = ypos;
            });
        this.collisionEngine.addListener(GameRocket, GameEnd,
            (rocket: Collisionable<GameRocket>, end: Collisionable<GameEnd>) => {
                this.levelRunning = false;
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
