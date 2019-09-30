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
import {LostLevel} from "./LostLevel";
import {sound} from "../SoundEngine";
import {GameCube} from "../entities/GameCube";

//TODO create template for levels
export class Level11 implements ILevel {

    private readonly center = new Coordinate(5, 4);
    private readonly distance = 10;
    private readonly viewDistance = 20;
    private readonly collisionEngine = new CollisionEngine();
    private levelEnd: ILevel | boolean = false;

    private user = new GameRocket(new Coordinate3D(5, 0, 4));
    private world = new GameWorld(new Coordinate3D(10, 90, 8));
    private end = new GameEnd(60);
    private obstacles = [
        new GameCube(0, 5, 0, 3, 3, 4),
        new GameCube(8, 9, 1, 2, 3, 8),
        new GameCube(3, 10, 7, 6, 2, 3),

        new GameCube(0, 15, 0, 10, 2, 3),
        new GameCube(0, 15, 6, 10, 2, 3),
        new GameCube(0, 15, 3, 4, 2, 3),
        new GameCube(6, 15, 3, 4, 2, 3),

        new GameCube(3, 25, 3, 6, 4, 3),

        new GameCube(2, 35, 3, 3, 6, 2),
        new GameCube(8, 39, 6, 2, 1, 2),
        new GameCube(1, 49, 1, 2, 4, 2),
        new GameCube(7, 49, 1, 2, 4, 2),
        //TODO add more
    ];


    constructor() {
        sound().playBackground();

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
        this.collisionEngine.addListener(GameRocket, GameEnd, () => this.levelEnd = true);
        this.collisionEngine.addListener(GameRocket, GameCube,
            () => {
                this.levelEnd = new LostLevel();
            });
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        this.user.state.coords.y += delta * 2;
        this.user.state.coords.x += events.getState().horizontalMovement * delta;
        this.user.state.coords.z += events.getState().verticalMovement * delta;

        this.center.x = 3 + this.user.state.coords.x / this.world.state.size.x * 4.0;
        this.center.y = 3 + this.user.state.coords.z / this.world.state.size.z * 2.0;
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

        renderer.setStyle({stroke: '#2e70ff', width: 2});
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

    finished(): ILevel | boolean {
        return this.levelEnd;
    }

}
