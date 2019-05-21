import {Coordinate3D} from "./entities";

export default {
    cube: (where: Coordinate3D): [Coordinate3D, Coordinate3D][] => {
        const {x, y, z} = where;
        const leftTopFront = new Coordinate3D(x, y, z + 1);
        const rightTopFront = new Coordinate3D(x + 1, y, z + 1);
        const leftBottomFront = new Coordinate3D(x, y, z);
        const rightBottomFront = new Coordinate3D(x + 1, y, z);
        const leftTopBack = new Coordinate3D(x, y + 1, z + 1);
        const rightTopBack = new Coordinate3D(x + 1, y + 1, z + 1);
        const leftBottomBack = new Coordinate3D(x, y + 1, z);
        const rightBottomBack = new Coordinate3D(x + 1, y + 1, z);

        return [
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
    },

    world: (width: number, height: number, depth: number, moved: number): [Coordinate3D, Coordinate3D][] => {
        const lines = [];
        for (let i = 0; i <= width; i++) {
            lines.push(
                [
                    new Coordinate3D(i, 0 - moved % 1, 0),
                    new Coordinate3D(i, depth - moved % 1, 0)
                ],
                [
                    new Coordinate3D(i, 0 - moved % 1, height),
                    new Coordinate3D(i, depth - moved % 1, height)
                ]
            )
        }
        for (let i = 0; i <= height; i++) {
            lines.push(
                [
                    new Coordinate3D(0, 0 - moved % 1, i),
                    new Coordinate3D(0, depth - moved % 1, i)
                ],
                [
                    new Coordinate3D(width, 0 - moved % 1, i),
                    new Coordinate3D(width, depth - moved % 1, i)
                ]
            )
        }
        for (let i = 0; i <= depth; i++) {
            lines.push(
                [
                    new Coordinate3D(0, i - moved % 1, 0),
                    new Coordinate3D(width, i - moved % 1, 0)
                ],
                [
                    new Coordinate3D(width, i - moved % 1, 0),
                    new Coordinate3D(width, i - moved % 1, height)
                ],
                [
                    new Coordinate3D(width, i - moved % 1, height),
                    new Coordinate3D(0, i - moved % 1, height)
                ],
                [
                    new Coordinate3D(0, i - moved % 1, height),
                    new Coordinate3D(0, i - moved % 1, 0)
                ]
            )
        }
        return lines;
    }
}
