import {MyGame} from "./MyGame";
import {init} from "./init";
import {Coordinate3D, Triangle3D} from "./Entities";

//const canvas = init('canvas');
//const game = new MyGame(canvas);
//game.start();


const f = new Triangle3D(
    new Coordinate3D(0, 0, 0),
    new Coordinate3D(8, 0, 0),
    new Coordinate3D(0, 5, 0),
);
const s = new Triangle3D(
    new Coordinate3D(6, -3.5, -2),
    new Coordinate3D(6, 6, -2),
    new Coordinate3D(6, 8, 3),
);
console.log(f.collide(s));
