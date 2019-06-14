import {ILevel} from "../ILevel";
import {EventEngine} from "../EventEngine";
import {Renderer} from "../Renderer";
import {positionCalculation} from "../positionCalculation";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {ColorRenderable, RenderableCube, WorldRenderable} from "../RenderableEntities";

export class LevelTesting implements ILevel {
    collisions(): void {
    }

    finished(): boolean {
        return false;
    }

    nextFrame(): void {
    }

    render(renderer: Renderer): void {
        const world = new Rect(32, 24);
        const distance = 10;
        renderer.newFrame(
            new Coordinate3D(world.w/2, world.h/2),
            world,
            distance,
            0,
            20
        );

        renderer.render(
            new ColorRenderable(
                {stroke: '#000000', width: 1},
                new WorldRenderable(world.w, world.h, 20, 0),
            )
        );

        renderer.render(
            new ColorRenderable(
                {stroke: '#FF0000'},
                new RenderableCube(0, -10, 0, 2, 30, 2)
            )
        );
    }

    update(delta: number, events: EventEngine): void {
    }

}
