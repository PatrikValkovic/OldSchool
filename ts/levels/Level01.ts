import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {ColorRenderable, RenderableCube, RocketRenderable, WorldRenderable} from "../RenderableEntities";

export class Level01 implements ILevel {

    private center = new Coordinate(4, 3);
    private word = new Rect(8, 6);
    private distance = 20;
    private userCoordinates = new Coordinate3D(4, 0, 3);

    constructor() {
    }

    nextFrame(): void {
    }

    update(delta: number): void {
        this.userCoordinates.y += delta;
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
                new WorldRenderable(this.word.w, this.word.h, 20, this.userCoordinates.y),
            )
        );
        renderer.render(
            new ColorRenderable(
                {stroke: '#0000FF'},
                new RenderableCube(2, 5, 2)
            )
        );
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
