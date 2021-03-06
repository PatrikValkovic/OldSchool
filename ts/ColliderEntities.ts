import {Coordinate3D, Interval} from "./Entities";
import {Triangle3D} from "./utils/Triangle3D";
import _ = require("lodash");

export abstract class Collider {

    protected abstract collideCallback(): string;

    public collide(second: Collider, direct: boolean = false): boolean {
        if (second[this.collideCallback()]) {
            return second[this.collideCallback()](this);
        }
        if (!direct) {
            return second.collide(this, true);
        }

        return this.collideRaw(second);
    }

    public abstract triangles(): Triangle3D[];

    public collideRaw(second: Collider): boolean {
        const trianglesCurrent = this.triangles();
        const trianglesSecond = second.triangles();
        for (const f of trianglesCurrent)
            for (const s of trianglesSecond)
                if (f.collide(s))
                    return true;
        return false;
    }
}

export class ColliderCube extends Collider {

    private readonly pos: Coordinate3D;
    private readonly size: Coordinate3D;

    constructor(pos: Coordinate3D, size: Coordinate3D) {
        super();
        this.pos = pos;
        this.size = size;
    }

    protected collideCallback(): string {
        return "collideCube";
    }

    public collideCube(second: ColliderCube): boolean{
        const tx = new Interval(this.pos.x, this.pos.x + this.size.x);
        const ty = new Interval(this.pos.y, this.pos.y + this.size.y);
        const tz = new Interval(this.pos.z, this.pos.z + this.size.z);
        const sx = new Interval(second.pos.x, second.pos.x + second.size.x);
        const sy = new Interval(second.pos.y, second.pos.y + second.size.y);
        const sz = new Interval(second.pos.z, second.pos.z + second.size.z);

        return tx.intersect(sx) && ty.intersect(sy) && tz.intersect(sz);
    }

    triangles(): Triangle3D[] {
        const {x, y, z} = this.pos;
        const {dx, dy, dz} = {dx: this.size.x, dy: this.size.y, dz: this.size.z};
        const leftTopFront = new Coordinate3D(x, y, z + dz);
        const rightTopFront = new Coordinate3D(x + dx, y, z + dz);
        const leftBottomFront = new Coordinate3D(x, y, z);
        const rightBottomFront = new Coordinate3D(x + dx, y, z);
        const leftTopBack = new Coordinate3D(x, y + dy, z + dz);
        const rightTopBack = new Coordinate3D(x + dx, y + dy, z + dz);
        const leftBottomBack = new Coordinate3D(x, y + dy, z);
        const rightBottomBack = new Coordinate3D(x + dx, y + dy, z);

        return [
            // front
            new Triangle3D(leftBottomFront, rightBottomFront, leftTopFront),
            new Triangle3D(leftTopFront, rightBottomFront, rightTopFront),
            // top
            new Triangle3D(leftTopFront, rightTopFront, rightTopBack),
            new Triangle3D(leftTopFront, leftTopBack, rightTopBack),
            // back
            new Triangle3D(leftTopBack, rightTopBack, rightBottomBack),
            new Triangle3D(leftBottomBack, rightBottomBack, leftTopBack),
            // bottom
            new Triangle3D(leftBottomFront, rightBottomFront, rightBottomBack),
            new Triangle3D(leftBottomFront, leftBottomBack, rightBottomBack),
            // left
            new Triangle3D(leftBottomFront, leftTopFront, leftTopBack),
            new Triangle3D(leftBottomFront, leftBottomBack, leftTopBack),
            // right
            new Triangle3D(rightBottomFront, rightTopFront, rightTopBack),
            new Triangle3D(rightBottomFront, rightBottomBack, rightTopBack),
        ];
    }
}

export class ColliderUnion extends Collider {

    constructor(private colliders: Collider[]){
        super();
    }

    protected collideCallback(): string {
        return "collideUnion";
    }

    triangles(): Triangle3D[] {
        const triangles: Triangle3D[][] = this.colliders.map(c => c.triangles());
        return _.concat([], ...triangles);
    }


    collide(second: Collider, direct: boolean = false): boolean {
        return _.some(this.colliders, c => c.collide(second, direct));
    }
}

export class ColliderPyramid extends Collider {

    constructor(private readonly coords: Coordinate3D,
                private readonly size: Coordinate3D){
        super();
    }

    protected collideCallback(): string {
        return "collidePyramid";
    }

    triangles(): Triangle3D[] {
        const d1 =  new Coordinate3D(this.coords.x, this.coords.y, this.coords.z);
        const d2 =  new Coordinate3D(this.coords.x+this.size.x, this.coords.y, this.coords.z);
        const d3 =  new Coordinate3D(this.coords.x, this.coords.y, this.coords.z+this.size.z);
        const d4 =  new Coordinate3D(this.coords.x+this.size.x, this.coords.y, this.coords.z+this.size.z);
        const u =  new Coordinate3D(
            this.coords.x + this.size.x / 2,
            this.coords.y + this.size.y,
            this.coords.z + this.size.z / 2
        );
        return [
            new Triangle3D(d1, d2, d3),
            new Triangle3D(d1, d3, d4),
            new Triangle3D(d1, d2, u),
            new Triangle3D(d2, d3, u),
            new Triangle3D(d3, d4, u),
            new Triangle3D(d4, d1, u),
        ];
    }

}

export abstract class Collisionable<T> {
    protected constructor(public readonly o: T){
    }

    abstract fastCollider(): Collider;

    abstract preciseCollider(): Collider;

    abstract collisionType(): any;

    collide(second: Collisionable<any>): boolean {
        return this.fastCollider().collide(second.fastCollider()) &&
            this.preciseCollider().collide(second.preciseCollider());
    }
}



