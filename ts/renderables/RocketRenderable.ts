import {LineRenderable} from "./LineRenderable";
import {Coordinate3D} from "../Entities";
import {Triangle3D} from "../utils/Triangle3D";

export class RocketRenderable extends LineRenderable {
    private frontVertex: Coordinate3D;
    private front: Coordinate3D[] = [];
    private around: Coordinate3D[] = [];
    private rwing: Coordinate3D[] = [];
    private lwing: Coordinate3D[] = [];
    private back: Coordinate3D[] = [];


    constructor(private pos: Coordinate3D,
                private size: Coordinate3D) {
        super();

        // front
        this.frontVertex = new Coordinate3D(0.5 * this.size.x, 1 * this.size.y, 0.5 * this.size.z);
        // front curve
        this.front.push(new Coordinate3D(0.6 * this.size.x, 0.7 * this.size.y, 0.9 * this.size.z));
        this.front.push(new Coordinate3D(0.4 * this.size.x, 0.7 * this.size.y, 0.9 * this.size.z));
        this.front.push(new Coordinate3D(0.4 * this.size.x, 0.7 * this.size.y, 0.1 * this.size.z));
        this.front.push(new Coordinate3D(0.6 * this.size.x, 0.7 * this.size.y, 0.1 * this.size.z));
        // around
        this.around.push(new Coordinate3D(0.7 * this.size.x, 0.4 * this.size.y, 1 * this.size.z));
        this.around.push(new Coordinate3D(0.3 * this.size.x, 0.4 * this.size.y, 1 * this.size.z));
        this.around.push(new Coordinate3D(0.3 * this.size.x, 0.4 * this.size.y, 0 * this.size.z));
        this.around.push(new Coordinate3D(0.7 * this.size.x, 0.4 * this.size.y, 0 * this.size.z));
        // back
        this.back.push(new Coordinate3D(0.65 * this.size.x, 0.2 * this.size.y, 0.85 * this.size.z));
        this.back.push(new Coordinate3D(0.35 * this.size.x, 0.2 * this.size.y, 0.85 * this.size.z));
        this.back.push(new Coordinate3D(0.35 * this.size.x, 0.2 * this.size.y, 0.15 * this.size.z));
        this.back.push(new Coordinate3D(0.65 * this.size.x, 0.2 * this.size.y, 0.15 * this.size.z));
        // right wing
        this.rwing.push(new Coordinate3D(0.65 * this.size.x, 0.2 * this.size.y, 0.5 * this.size.z));
        this.rwing.push(new Coordinate3D(1 * this.size.x, 0 * this.size.y, 0.5 * this.size.z));
        this.rwing.push(new Coordinate3D(1 * this.size.x, 0.5 * this.size.y, 0.5 * this.size.z));
        this.rwing.push(new Coordinate3D(0.6 * this.size.x, 0.7 * this.size.y, 0.5 * this.size.z));
        // left wing
        this.lwing.push(new Coordinate3D(0.35 * this.size.x, 0.2 * this.size.y, 0.5 * this.size.z));
        this.lwing.push(new Coordinate3D(0 * this.size.x, 0 * this.size.y, 0.5 * this.size.z));
        this.lwing.push(new Coordinate3D(0 * this.size.x, 0.5 * this.size.y, 0.5 * this.size.z));
        this.lwing.push(new Coordinate3D(0.4 * this.size.x, 0.7 * this.size.y, 0.5 * this.size.z));
        // back rockets

        // TRANSITION
        this.frontVertex = Triangle3D.plus(this.frontVertex, this.pos);
        this.front = this.front.map(p => Triangle3D.plus(p, this.pos));
        this.around = this.around.map(p => Triangle3D.plus(p, this.pos));
        this.back = this.back.map(p => Triangle3D.plus(p, this.pos));
        this.rwing = this.rwing.map(p => Triangle3D.plus(p, this.pos));
        this.lwing = this.lwing.map(p => Triangle3D.plus(p, this.pos));
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        yield this.frontVertex;
        yield* this.front;
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        // front pike
        yield [this.frontVertex, this.front[0]];
        yield [this.frontVertex, this.front[1]];
        yield [this.frontVertex, this.front[2]];
        yield [this.frontVertex, this.front[3]];
        yield [this.front[0], this.front[1]];
        yield [this.front[1], this.front[2]];
        yield [this.front[2], this.front[3]];
        yield [this.front[3], this.front[0]];
        // body
        yield [this.front[0], this.around[0]];
        yield [this.around[0], this.back[0]];
        yield [this.front[1], this.around[1]];
        yield [this.around[1], this.back[1]];
        yield [this.front[2], this.around[2]];
        yield [this.around[2], this.back[2]];
        yield [this.front[3], this.around[3]];
        yield [this.around[3], this.back[3]];
        // join around
        //yield [this.around[0], this.around[1]];
        //yield [this.around[1], this.around[2]];
        //yield [this.around[2], this.around[3]];
        //yield [this.around[3], this.around[0]];
        // join back
        yield [this.back[0], this.back[1]];
        yield [this.back[1], this.back[2]];
        yield [this.back[2], this.back[3]];
        yield [this.back[3], this.back[0]];
        // left wing
        yield [this.lwing[0], this.lwing[1]];
        yield [this.lwing[1], this.lwing[2]];
        yield [this.lwing[2], this.lwing[3]];
        yield [this.lwing[3], this.lwing[0]];
        // right wing
        yield [this.rwing[0], this.rwing[1]];
        yield [this.rwing[1], this.rwing[2]];
        yield [this.rwing[2], this.rwing[3]];
        yield [this.rwing[3], this.rwing[0]];
    }

}
