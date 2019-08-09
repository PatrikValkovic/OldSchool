import {LineRenderable} from "./LineRenderable";
import {Coordinate3D} from "../Entities";

export class RenderableCube extends LineRenderable {
    private readonly coords: Coordinate3D;
    private readonly diffs: Coordinate3D;

    constructor(x: number, y: number, z: number, dx: number = 1, dy: number = 1, dz: number = 1) {
        super();
        this.coords = new Coordinate3D(x, y, z);
        this.diffs = new Coordinate3D(dx, dy, dz);
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        for (let x = 0; x < 1; x++)
            for (let y = 0; y < 1; y++)
                for (let z = 0; z < 1; z++)
                    yield new Coordinate3D(
                        this.coords.x + x,
                        this.coords.y + y,
                        this.coords.z + z);
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        const {x, y, z} = this.coords;
        const {dx, dy, dz} = {dx: this.diffs.x, dy: this.diffs.y, dz: this.diffs.z};
        const leftTopFront = new Coordinate3D(x, y, z + dz);
        const rightTopFront = new Coordinate3D(x + dx, y, z + dz);
        const leftBottomFront = new Coordinate3D(x, y, z);
        const rightBottomFront = new Coordinate3D(x + dx, y, z);
        const leftTopBack = new Coordinate3D(x, y + dy, z + dz);
        const rightTopBack = new Coordinate3D(x + dx, y + dy, z + dz);
        const leftBottomBack = new Coordinate3D(x, y + dy, z);
        const rightBottomBack = new Coordinate3D(x + dx, y + dy, z);

        yield* [
            [leftTopFront, rightTopFront],
            [leftTopFront, leftBottomFront],
            [leftTopFront, leftTopBack],
            [leftBottomFront, rightBottomFront],
            [leftBottomFront, leftBottomBack],
            [rightTopFront, rightBottomFront],
            [rightTopFront, rightTopBack],
            [rightBottomFront, rightBottomBack],
            [leftTopBack, rightTopBack],
            [leftTopBack, leftBottomBack],
            [leftBottomBack, rightBottomBack],
            [rightTopBack, rightBottomBack]
        ];
    }
}
