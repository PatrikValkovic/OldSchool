import {Coordinate3D, Interval} from "./Entities";

export class Triangle3D {
    private readonly points: Coordinate3D[];

    constructor(x1: Coordinate3D, x2: Coordinate3D, x3: Coordinate3D) {
        this.points = [x1, x2, x3];
    }

    private static readonly EPS = 0.0000000001;

    private static plus(first: Coordinate3D, second: Coordinate3D): Coordinate3D {
        return new Coordinate3D(
            first.x + second.x,
            first.y + second.y,
            first.z + second.z,
        )
    }

    private static minus(first: Coordinate3D, second: Coordinate3D): Coordinate3D {
        return new Coordinate3D(
            first.x - second.x,
            first.y - second.y,
            first.z - second.z,
        )
    }

    private static mult(n: number, vector: Coordinate3D): Coordinate3D {
        return new Coordinate3D(
            n * vector.x,
            n * vector.y,
            n * vector.z,
        )
    }

    private static normalize(vector: Coordinate3D): Coordinate3D {
        return this.mult(1 / this.vecLength(vector), vector);
    }

    private static dot(first: Coordinate3D, second: Coordinate3D): number {
        return first.x * second.x + first.y * second.y + first.z * second.z;
    }

    private static cross(first: Coordinate3D, second: Coordinate3D): Coordinate3D {
        return new Coordinate3D(
            first.y * second.z - first.z * second.y,
            first.z * second.x - first.x * second.z,
            first.x * second.y - first.y * second.x,
        )
    }

    private static vecLength(vector: Coordinate3D): number {
        return Math.sqrt(
            Math.pow(vector.x, 2) +
            Math.pow(vector.y, 2) +
            Math.pow(vector.z, 2)
        )
    }

    private static sign(x: number): -1 | 1 {
        return x < 0 ? -1 : 1;
    }

    private static equal(first: Coordinate3D, second: Coordinate3D): boolean {
        return Math.abs(first.x - second.x) < this.EPS &&
            Math.abs(first.y - second.y) < this.EPS &&
            Math.abs(first.z - second.z) < this.EPS;
    }

    private static parallel(vector1: Coordinate3D, vector2: Coordinate3D) {
        const l = this.dot(vector1, vector2) / (this.vecLength(vector1) * this.vecLength(vector2));
        return 1 - Math.abs(l) < this.EPS;
    }

    private static getNotParallel(vector: Coordinate3D, plane: Triangle3D): number[] {
        for (const coords of [[0, 1], [1, 2], [0, 2]]) {
            const fi = coords[0];
            const si = coords[1];
            if (!this.parallel(vector, this.minus(plane.points[fi], plane.points[si])))
                return coords;
        }
        return [-1, -1];
    }

    private static intersectLine(start1: Coordinate3D, direction1: Coordinate3D, start2: Coordinate3D, direction2: Coordinate3D): number[] {
        if (this.parallel(direction1, direction2)) {
            return [Infinity, Infinity];
        }
        const compute = (s1x, s1y, d1x, d1y, s2x, s2y, d2x, d2y) => {
            const t2 = (s2y * d1x + s1x * d1y - s1y * d1x - s2x * d1y) / (d2x * d1y - d2y * d1x);
            return [
                t2,
                (s2x + t2 * d2x - s1x) / d1x
            ];
        };

        // select properties to use
        let firstProp = null;
        for (const p of ['x', 'y', 'z'])
            if (direction1[p] != 0)
                firstProp = p;
        let secondProp = null;
        for (const p of ['x', 'y', 'z'])
            if (p !== firstProp && (direction1[p] !== 0 || direction2[p] !== 0))
                secondProp = p;

        const [t1, t2] = compute(
            start1[firstProp], start1[secondProp],
            direction1[firstProp], direction1[secondProp],
            start2[firstProp], start2[secondProp],
            direction2[firstProp], direction2[secondProp],
        );
        return [t1, t2];
    }

    private static intersectLineTriangle(start: Coordinate3D, direction: Coordinate3D, triangle: Triangle3D): Interval {
        const intersects = [];
        for (const comb of [[0, 1], [1, 2], [0, 2]]) {
            const firstPoint = triangle.points[comb[0]];
            const secondPoint = triangle.points[comb[1]];
            const [triangleMovement, lineMovement] = this.intersectLine(
                start, direction,
                firstPoint, this.minus(secondPoint, firstPoint)
            );
            if (triangleMovement >= 0 && triangleMovement <= 1) {
                intersects.push(lineMovement);
            }
        }
        return new Interval(intersects[0], intersects[1]);
    }

    private static canPointsIntersectPlane(first: Triangle3D, second: Triangle3D) {
        // plane = N*P+d

        // normal
        const N = Triangle3D.cross(
            Triangle3D.minus(first.points[1], first.points[0]),
            Triangle3D.minus(first.points[2], first.points[0]),
        );
        const d = Triangle3D.dot(
            Triangle3D.minus(new Coordinate3D(), N),
            first.points[0]
        );

        let signum = null;
        for (const p of second.points) {
            const distance = Triangle3D.dot(N, p) + d;
            if (distance == 0)
                return true;
            if (signum === null)
                signum = Triangle3D.sign(distance);
            if (Triangle3D.sign(distance) !== signum)
                return true;
        }
        return false;
    }

    private static twoRectanglesIntersect(first: Triangle3D, second: Triangle3D): boolean {
        // plane = N*P+d
        const N1 = this.normalize(Triangle3D.cross(
            Triangle3D.minus(first.points[1], first.points[0]),
            Triangle3D.minus(first.points[2], first.points[0]),
        ));
        const d1 = Triangle3D.dot(
            Triangle3D.minus(new Coordinate3D(), N1),
            first.points[0]
        );
        const N2 = this.normalize(Triangle3D.cross(
            Triangle3D.minus(second.points[1], second.points[0]),
            Triangle3D.minus(second.points[2], second.points[0]),
        ));
        const d2 = Triangle3D.dot(
            Triangle3D.minus(new Coordinate3D(), N2),
            second.points[0]
        );

        if (this.parallel(N1, N2) && Math.abs(d1 - d2) > this.EPS) {
            // different parallel planes
            return false;
        } else if (this.parallel(N1, N2) && Math.abs(d1 - d2) < this.EPS) {
            // at the same plane
            //TODO
            throw new Error("Not implemented");
        }

        // intersection line
        const intersectDirection = this.cross(N1, N2);
        const indexes = this.getNotParallel(intersectDirection, first);
        const crossVect = this.minus(first.points[indexes[1]], first.points[indexes[0]]);
        const s = this.dot(N2, this.minus(second.points[0], first.points[indexes[0]]))
            /
            this.dot(N2, crossVect);
        const intersectPoint = this.plus(first.points[indexes[0]], this.mult(s, crossVect));

        const fInterval = this.intersectLineTriangle(intersectPoint, intersectDirection, first);
        const sInterval = this.intersectLineTriangle(intersectPoint, intersectDirection, second);

        return fInterval.intersect(sInterval);
    }


    public collide(second: Triangle3D): boolean {
        return Triangle3D.canPointsIntersectPlane(this, second) &&
            Triangle3D.twoRectanglesIntersect(this, second);
    }
}
