import {LineRenderable} from "./LineRenderable";
import {Coordinate3D} from "../Entities";

export class WorldRenderable extends LineRenderable {
    constructor(private width: number,
                private height: number,
                private depth: number,
                private moved: number) {
        super();
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        const {width, height, depth, moved} = this;
        const pos = Math.floor(moved);
        // from top/bottom back
        for (let i = 0; i <= width; i++) {
            yield [
                new Coordinate3D(i, pos, 0),
                new Coordinate3D(i, depth, 0)
            ];
            yield [
                new Coordinate3D(i, pos, height),
                new Coordinate3D(i, depth, height)
            ];
        }
        // from left/right back
        for (let i = 0; i <= height; i++) {
            yield [
                new Coordinate3D(0, pos, i),
                new Coordinate3D(0, depth, i)
            ];
            yield [
                new Coordinate3D(width, pos, i),
                new Coordinate3D(width, depth, i)
            ];
        }
        // crossing lines
        for (let i = 0; i <= depth - moved + 1; i++) {
            yield [
                new Coordinate3D(0, i + pos, 0),
                new Coordinate3D(width, i + pos, 0)
            ];
            yield [
                new Coordinate3D(width, i + pos, 0),
                new Coordinate3D(width, i + pos, height)
            ];
            yield [
                new Coordinate3D(width, i + pos, height),
                new Coordinate3D(0, i + pos, height)
            ];
            yield [
                new Coordinate3D(0, i + pos, height),
                new Coordinate3D(0, i + pos, 0)
            ]
        }
    }

}
