import {MyGame} from "./MyGame";
import {init} from "./init";

const canvas = init('canvas');
const game = new MyGame(canvas);
game.start();
