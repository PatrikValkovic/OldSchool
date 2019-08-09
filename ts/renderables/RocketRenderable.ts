import {LineRenderable} from "./LineRenderable";
import {Coordinate3D} from "../Entities";
import {RenderableCube} from "./RenderableCube";

export class RocketRenderable extends LineRenderable {
    constructor(private x: number, private y: number, private z: number) {
        super();
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        yield* (new RenderableCube(this.x - 0.1, this.y - 0.8, this.z - 0.05, 0.2, 0.8, 0.1)).joins();
        yield* [
            [
                new Coordinate3D(this.x - 0.1, this.y, this.z - 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
            [
                new Coordinate3D(this.x + 0.1, this.y, this.z - 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
            [
                new Coordinate3D(this.x - 0.1, this.y, this.z + 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
            [
                new Coordinate3D(this.x + 0.1, this.y, this.z + 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
        ];
    }

}
