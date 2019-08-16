import {LineRenderable} from "./LineRenderable";
import {Coordinate3D} from "../Entities";
import {RenderableCube} from "./RenderableCube";

export class RocketRenderable extends LineRenderable {
    constructor(private pos: Coordinate3D,
                private size: Coordinate3D) {
        super();
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        // TODO recompute size
        yield* (new RenderableCube(this.pos.x, this.pos.y, this.pos.z, this.size.x, this.size.y, this.size.z)).joins();
    }

}
