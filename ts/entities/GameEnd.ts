import {Coordinate3D, Rect} from "../Entities";
import {GameEntity} from "./GameEntity";
import {Collider, ColliderCube, Collisionable} from "../ColliderEntities";
import {EndRenderable} from "../renderables/EndRenderable";

type EndState = {
    yIndex: number,
}

class EndCollisionable extends Collisionable<GameEnd> {
    constructor(end: GameEnd){
        super(end);
    }

    fastCollider(): Collider {
        return this.preciseCollider();
    }

    preciseCollider(): Collider {
        return new ColliderCube(
            new Coordinate3D(-Number.MAX_VALUE, this.o.state.yIndex, -Number.MAX_VALUE),
            new Coordinate3D(Infinity, Infinity, Infinity)
        );
    }

    collisionType(): any {
        return GameEnd;
    }

}

export class GameEnd extends GameEntity<EndState> {

    constructor(levelDepth: number) {
        super({
            yIndex: levelDepth
        });
    }

    getRenderable(): EndRenderable {
        return new EndRenderable(this.state.yIndex);
    }

    getColliders() : EndCollisionable {
        return new EndCollisionable(this);
    }
}
