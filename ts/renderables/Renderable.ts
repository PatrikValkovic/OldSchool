import {Coordinate, Rect} from "../Entities";

//TODO optimize to use template instead of hardcoded parameters
export abstract class Renderable {
    abstract render(context: CanvasRenderingContext2D,
                    canvasSize: Rect,
                    center: Coordinate,
                    wordSize: Rect,
                    distance: number,
                    viewStart: number,
                    viewDistance: number): void;
}
