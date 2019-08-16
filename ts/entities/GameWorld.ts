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
        return new ColliderUnion([
            // left
            new ColliderCube(
                new Coordinate3D(-1, 0, -1),
                new Coordinate3D(1, this.o.state.size.y, this.o.state.size.z + 2)
            ),
            // top
            new ColliderCube(
                new Coordinate3D(-1, 0, this.o.state.size.z),
                new Coordinate3D(this.o.state.size.x + 2, this.o.state.size.y, 1)
            ),
            // right
            new ColliderCube(
                new Coordinate3D(this.o.state.size.x, 0, -1),
                new Coordinate3D(1, this.o.state.size.y, this.o.state.size.z + 2)
            ),
            // bottom
            new ColliderCube(
                new Coordinate3D(-1, 0, -1),
                new Coordinate3D(this.o.state.size.x + 2, this.o.state.size.y, 1)
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
