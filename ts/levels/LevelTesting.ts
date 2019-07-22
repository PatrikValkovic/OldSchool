import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {Coordinate, Rect} from "../Entities";
import {ColorRenderable, WorldRenderable} from "../RenderableEntities";
import {EventEngine} from "../EventEngine";
import {GameCube, GameRocket} from "../GameEntities";

export class LevelTesting implements ILevel {

    private center = new Coordinate(4, 3);
    private word = new Rect(8, 6);
    private distance = 10;
    private readonly viewDistance = 20;

    private user = new GameRocket();
    private cubes = [
        new GameCube(0,10,0),
        new GameCube(5,11,5),
        new GameCube(5,14,5),
        new GameCube(4,15,5),
        new GameCube(3,17,4),
        new GameCube(4,17,4),
        new GameCube(0,20,0, 2, 4, 2),
        new GameCube(4,25,4),
        new GameCube(5,25,4),
        new GameCube(5,25,5),
        new GameCube(1,26,1),
        new GameCube(0, 5, 0, 1, 8, 1),
        new GameCube(16, 25, 10, 4, 4, 4),
    ];

    constructor() {
        this.user.coords.x = 4;
        this.user.coords.y = 1;
        this.user.coords.z = 0.5;
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        this.user.coords.y += delta;
        this.user.coords.x += events.getState().horizontalMovement * delta;

        this.user.coords.x = Math.max(0, this.user.coords.x);
        this.user.coords.x = Math.min(this.word.w, this.user.coords.x);
    }

    collisions(): void {

    }

    render(renderer: Renderer): void {
        renderer.newFrame(
            this.center,
            this.word,
            this.distance,
            this.user.coords.y,
            this.viewDistance
        );

        renderer.render(
            new ColorRenderable(
                {stroke: '#000000', width: 1},
                new WorldRenderable(this.word.w, this.word.h, this.viewDistance + 1, this.user.coords.y),
            )
        );
        for(const c of this.cubes) {
            if(c.isVisible(this.user.coords.y, 20))
                renderer.render(
                    new ColorRenderable(
                        {stroke: '#0000FF', width: 2},
                        c.getRenderable(),
                    )
                );
        }
        renderer.render(
            new ColorRenderable(
                {stroke: '#FF0000', width: 2},
                this.user.getRenderable()
            )
        );
    }

    finished(): boolean {
        return false;
    }

}
