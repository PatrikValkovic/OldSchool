import {Coordinate3D} from "../Entities";
import {GameEntity} from "./GameEntity";
import {Collider, ColliderCube, ColliderUnion, Collisionable} from "../ColliderEntities";
import {WorldRenderable} from "../renderables/WorldRenderable";

type WordState = {
    size: Coordinate3D,
}

class WorldCollisionable extends Collisionable<GameWorld> {
    constructor(cube: GameWorld){
        super(cube);
    }

    fastCollider(): Collider {
        const THICKNESS = 100;
        return new ColliderUnion([
            // left
            new ColliderCube(
                new Coordinate3D(-THICKNESS, 0, -THICKNESS),
                new Coordinate3D(THICKNESS, this.o.state.size.y, this.o.state.size.z + 2*THICKNESS)
            ),
            // top
            new ColliderCube(
                new Coordinate3D(-THICKNESS, 0, this.o.state.size.z),
                new Coordinate3D(this.o.state.size.x + 2 * THICKNESS, this.o.state.size.y, THICKNESS)
            ),
            // right
            new ColliderCube(
                new Coordinate3D(this.o.state.size.x, 0, -THICKNESS),
                new Coordinate3D(THICKNESS, this.o.state.size.y, this.o.state.size.z + 2*THICKNESS)
            ),
            // bottom
            new ColliderCube(
                new Coordinate3D(-THICKNESS, 0, -THICKNESS),
                new Coordinate3D(this.o.state.size.x + 2*THICKNESS, this.o.state.size.y, THICKNESS)
            ),
        ])
    }

    preciseCollider(): Collider {
        return this.fastCollider();
    }

    collisionType(): any {
        return GameWorld;
    }
}

export class GameWorld extends GameEntity<WordState> {

    constructor(size: Coordinate3D) {
        super({
            size,
        });
    }

    getRenderable(moved: number): WorldRenderable {
        return new WorldRenderable(
            this.state.size.x,
            this.state.size.z,
            this.state.size.y,
            moved
        );
    }

    getColliders() : WorldCollisionable {
        return new WorldCollisionable(this);
    }
}
