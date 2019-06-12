import {Coordinate3D} from "./Entities";
import {RenderableCube} from "./RenderableEntities";

export class GameCube {
    private readonly coords: Coordinate3D;
    private readonly diffs: Coordinate3D;

    constructor(x: number, y: number, z: number, dx: number = 1, dy: number = 1, dz: number = 1) {
        this.coords = new Coordinate3D(x, y, z);
        this.diffs = new Coordinate3D(dx, dy, dz);
    }

    isVisible(userPos: number, distance: number){
        const tile = Math.floor(userPos);
        return this.coords.y + this.diffs.y > tile && this.coords.y < tile + distance;
    }

    getRenderable(userPos: number): RenderableCube {
        const {x, y, z} = this.coords;
        const dx = this.diffs.x;
        const dy = this.diffs.y;
        const dz = this.diffs.z;
        return new RenderableCube(x, y-userPos, z, dx, dy, dz)
    }
}
