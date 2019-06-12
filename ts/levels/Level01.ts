import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {ColorRenderable, RenderableCube, RocketRenderable, WorldRenderable} from "../RenderableEntities";
import {EventEngine} from "../EventEngine";
import {GameCube} from "../GameEntities";

export class Level01 implements ILevel {

    private center = new Coordinate(4, 3);
    private word = new Rect(32, 24);
    private distance = 3;
    private userCoordinates = new Coordinate3D(4, 0, 3);

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
        new GameCube(0, 5, 0, 1, 8, 1)
    ];

    constructor() {
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        this.userCoordinates.y += delta;
        this.userCoordinates.x += events.getState().horizontalMovement * delta;
        this.userCoordinates.z += events.getState().verticalMovement * delta;

        this.userCoordinates.x = Math.max(0, this.userCoordinates.x);
        this.userCoordinates.x = Math.min(this.word.w, this.userCoordinates.x);
        this.userCoordinates.z = Math.max(0, this.userCoordinates.z);
        this.userCoordinates.z = Math.min(this.word.h, this.userCoordinates.z);

        const relativeVert = 1 - 2 * this.userCoordinates.z / this.word.h;
        const relativeHoriz = 1 - 2 * this.userCoordinates.x / this.word.w;
        const centerMovementVert = 1.5;
        const centerMovementHoriz = 2;
        this.center.x = this.word.w / 2 - relativeHoriz * centerMovementHoriz;
        this.center.y = this.word.h / 2 - relativeVert * centerMovementVert;
    }

    collisions(): void {

    }

    render(renderer: Renderer): void {
        renderer.newFrame(
            this.center,
            this.word,
            this.distance
        );

        renderer.render(
            new ColorRenderable(
                {stroke: '#000000', width: 1},
                new WorldRenderable(this.word.w / 4, this.word.h / 4, 20, this.userCoordinates.y),
            )
        );
        for(const c of this.cubes) {
            if(c.isVisible(this.userCoordinates.y, 20))
                renderer.render(
                    new ColorRenderable(
                        {stroke: '#0000FF', width: 2},
                        c.getRenderable(this.userCoordinates.y),
                    )
                );
        }
        renderer.render(
            new ColorRenderable(
                {stroke: '#FF0000', width: 2},
                new RocketRenderable(this.userCoordinates.x, 1, this.userCoordinates.z)
            )
        );
    }

    finished(): boolean {
        return false;
    }

}
