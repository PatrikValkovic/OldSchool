import {ILevel} from "./ILevel";
import {Renderer} from "../Renderer";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {EventEngine} from "../EventEngine";
import {StyleRenderable} from "../renderables/StyleRenderable";
import {WorldRenderable} from "../renderables/WorldRenderable";
import {GameCube} from "../entities/GameCube";
import {GameRocket} from "../entities/GameRocket";
import {CollisionEngine} from "../CollisionEngine";
import {GameWorld} from "../entities/GameWorld";
import {Collisionable} from "../ColliderEntities";

export class LevelTesting implements ILevel {

    private center = new Coordinate(4, 3);
    private distance = 10;
    private readonly viewDistance = 20;

    private user = new GameRocket();
    private cubes = [
        new GameCube(0, 10, 0),
        new GameCube(5, 11, 5),
        new GameCube(5, 14, 5),
        new GameCube(4, 15, 5),
        new GameCube(3, 17, 4),
        new GameCube(4, 17, 4),
        new GameCube(0, 20, 0, 2, 4, 2),
        new GameCube(4, 25, 4),
        new GameCube(5, 25, 4),
        new GameCube(5, 25, 5),
        new GameCube(1, 26, 1),
        new GameCube(0, 5, 0, 1, 8, 1),
        new GameCube(16, 25, 10, 4, 4, 4),
    ];
    private world = new GameWorld(new Coordinate3D(8, 50, 6));

    private collisionEngine = new CollisionEngine();

    constructor() {
        this.user.state.coords.x = 4;
        this.user.state.coords.y = 0;
        this.user.state.coords.z = 0.5;

        this.collisionEngine.addStatic(...this.cubes.map(c => c.getColliders()));
        this.collisionEngine.addStatic(this.world.getColliders());
        this.collisionEngine.addDynamic(this.user.getColliders());

        this.collisionEngine.addListener(GameRocket, GameCube, (rocket, cube) => {
            console.log("Game over");
        });
        this.collisionEngine.addListener(GameRocket, GameWorld, (rocket: Collisionable<GameRocket>, world: Collisionable<GameWorld>) => {
            const ypos = rocket.o.state.coords.y;
            rocket.o.rollbackState();
            rocket.o.state.coords.y = ypos;
        });
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        this.user.state.coords.y += delta;
        this.user.state.coords.x += events.getState().horizontalMovement * delta;
    }

    collisions(): void {
        this.collisionEngine.checkAll();

        this.user.applyState();
    }

    render(renderer: Renderer): void {
        renderer.newFrame(
            this.center,
            new Rect(this.world.state.size.x, this.world.state.size.z),
            this.distance,
            this.user.state.coords.y,
            this.viewDistance
        );

        renderer.render(
            new StyleRenderable(
                {stroke: '#000000', width: 1},
                this.world.getRenderable(this.user.state.coords.y),
            )
        );

        this.cubes
            .filter(c => c.isVisible(this.user.state.coords.y, 20))
            .forEach(c => renderer.render(
                new StyleRenderable(
                    {stroke: '#0000FF', width: 2},
                    c.getRenderable()
                )
            ));

        renderer.render(
            new StyleRenderable(
                {stroke: '#FF0000', width: 2},
                this.user.getRenderable()
            )
        );
    }

    finished(): boolean {
        return false;
    }

}
