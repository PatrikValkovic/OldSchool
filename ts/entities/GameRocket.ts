import {Coordinate3D} from "../Entities";
import {Renderable} from "../renderables/Renderable";
import {RocketRenderable} from "../renderables/RocketRenderable";
import {GameEntity} from "./GameEntity";

type RocketState = {
    coords: Coordinate3D
}

export class GameRocket extends GameEntity<RocketState> {

    constructor() {
        super();
        this.state.coords = new Coordinate3D();
        this.applyState();
    }

    isVisible(userPos: number, distance: number) {
        return true;
    }

    getRenderable(): Renderable {
        const {x, y, z} = this.state.coords;
        return new RocketRenderable(x, y, z);
    }
}
