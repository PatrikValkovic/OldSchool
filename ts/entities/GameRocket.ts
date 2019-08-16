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

    public static readonly SIZE = new Coordinate3D(1, 2, 1);

    constructor() {
        super({
            coords: new Coordinate3D()
        });
    }

    isVisible(userPos: number, distance: number) {
        return true;
    }

    getRenderable(): Renderable {
        return new RocketRenderable(this.state.coords, GameRocket.SIZE);
    }

    getColliders(): Collisionable<GameRocket>{
        return new RocketCollision(this);
    }
}
