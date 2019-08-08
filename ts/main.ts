import {MyGame} from "./MyGame";
import {init} from "./init";

export function main() {
    const canvas = init('canvas');
    const game = new MyGame(canvas);
    game.start();
}
