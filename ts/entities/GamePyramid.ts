import {Coordinate3D} from "../Entities";
import {GameEntity} from "./GameEntity";
import {Collider, ColliderCube, ColliderPyramid, Collisionable} from "../ColliderEntities";
import {RenderablePyramid} from "../renderables/RenderablePyramid";

type PyramidState = {
    coords: Coordinate3D,
    size: Coordinate3D,
}

class PyramidCollisionable extends Collisionable<GamePyramid> {
    constructor(cube: GamePyramid){
        super(cube);
    }

    fastCollider(): Collider {
        return new ColliderCube(
            this.o.state.coords,
            this.o.state.size
        )
    }

    preciseCollider(): Collider {
        return new ColliderPyramid(
            this.o.state.coords,
            this.o.state.size
        );
    }

    collisionType(): any {
        return GamePyramid;
    }

}

export class GamePyramid extends GameEntity<PyramidState> {

    constructor(x: number, y: number, z: number, dx: number = 1, dy: number = 1, dz: number = 1) {
        super({
            coords: new Coordinate3D(x, y, z),
            size: new Coordinate3D(dx, dy, dz)
        });
    }

    isVisible(userPos: number, distance: number) {
        return (userPos < this.state.coords.y && this.state.coords.y < userPos + distance) ||
            (userPos < this.state.coords.y + this.state.size.y && this.state.coords.y + this.state.size.y < userPos + distance)
    }

    getRenderable(): RenderablePyramid {
        return new RenderablePyramid(this.state.coords, this.state.size);
    }

    getColliders() : PyramidCollisionable {
        return new PyramidCollisionable(this);
    }
}
