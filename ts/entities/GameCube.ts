import {Coordinate3D} from "../Entities";
import {RenderableCube} from "../renderables/RenderableCube";
import {GameEntity} from "./GameEntity";
import {Collider, ColliderCube, Collisionable} from "../ColliderEntities";

type CubeState = {
    coords: Coordinate3D,
    size: Coordinate3D,
}

class CubeCollisionable extends Collisionable<GameCube> {
    constructor(cube: GameCube){
        super(cube);
    }

    fastCollider(): Collider {
        return new ColliderCube(
            this.o.state.coords,
            this.o.state.size
        );
    }

    preciseCollider(): Collider {
        return new ColliderCube(
            this.o.state.coords,
            this.o.state.size
        );
    }

    collisionType(): any {
        return GameCube;
    }

}

export class GameCube extends GameEntity<CubeState> {

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

    getRenderable(): RenderableCube {
        const {x, y, z} = this.state.coords;
        const dx = this.state.size.x;
        const dy = this.state.size.y;
        const dz = this.state.size.z;
        return new RenderableCube(x, y, z, dx, dy, dz);
    }

    getColliders() : CubeCollisionable {
        return new CubeCollisionable(this);
    }
}
