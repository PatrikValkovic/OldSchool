import {Coordinate3D} from "../Entities";
import {Renderable} from "../renderables/Renderable";
import {RocketRenderable} from "../renderables/RocketRenderable";
import {GameEntity} from "./GameEntity";
import {Collider, ColliderCube, Collisionable} from "../ColliderEntities";

type RocketState = {
    coords: Coordinate3D
}

class RocketCollision extends Collisionable<GameRocket>{
    constructor(o: GameRocket){
        super(o);
    }

    collisionType(): any {
        return GameRocket;
    }

    fastCollider(): Collider {
        return new ColliderCube(
            this.o.state.coords,
            GameRocket.SIZE
        );
    }

    preciseCollider(): Collider {
        return new ColliderCube(
            this.o.state.coords,
            GameRocket.SIZE
        );
    }
}

export class GameRocket extends GameEntity<RocketState> {

    public static readonly SIZE = new Coordinate3D(0.6, 1.5, 0.3);

    constructor(startPos: Coordinate3D = new Coordinate3D()) {
        super({
            coords: new Coordinate3D(startPos.x, startPos.y, startPos.z)
        });
    }

    getRenderable(): Renderable {
        return new RocketRenderable(this.state.coords, GameRocket.SIZE);
    }

    getColliders(): Collisionable<GameRocket>{
        return new RocketCollision(this);
    }
}
