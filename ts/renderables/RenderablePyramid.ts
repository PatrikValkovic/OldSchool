import {LineRenderable} from "./LineRenderable";
import {Coordinate3D} from "../Entities";

export class RenderablePyramid extends LineRenderable {
    constructor(private readonly coords: Coordinate3D,
                private readonly size: Coordinate3D) {
        super();
    }

    *getPoints(): IterableIterator<Coordinate3D> {
        yield new Coordinate3D(this.coords.x, this.coords.y, this.coords.z);
        yield new Coordinate3D(this.coords.x+this.size.x, this.coords.y, this.coords.z);
        yield new Coordinate3D(this.coords.x, this.coords.y, this.coords.z+this.size.z);
        yield new Coordinate3D(this.coords.x+this.size.x, this.coords.y, this.coords.z+this.size.z);
        yield new Coordinate3D(
            this.coords.x + this.size.x / 2,
            this.coords.y + this.size.y,
            this.coords.z + this.size.z / 2
        );
    }

    *joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        const d1 =  new Coordinate3D(this.coords.x, this.coords.y, this.coords.z);
        const d2 =  new Coordinate3D(this.coords.x+this.size.x, this.coords.y, this.coords.z);
        const d3 =  new Coordinate3D(this.coords.x+this.size.x, this.coords.y + this.size.y, this.coords.z);
        const d4 =  new Coordinate3D(this.coords.x, this.coords.y + this.size.y, this.coords.z);
        const u =  new Coordinate3D(
            this.coords.x + this.size.x / 2,
            this.coords.y + this.size.y / 2,
            this.coords.z + this.size.z
        );
        yield* [
            [d1, d2],
            [d2, d3],
            [d3, d4],
            [d4, d1],
            [d1, u],
            [d2, u],
            [d3, u],
            [d4, u],
        ];
    }


}
