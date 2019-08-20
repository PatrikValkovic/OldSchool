import {Renderable} from "./Renderable";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {positionCalculation} from "../utils/positionCalculation";

export class EndRenderable extends Renderable {

    constructor(private yPosition: number) {
        super();
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect,
           center: Coordinate,
           wordSize: Rect,
           distance: number,
           viewStart: number,
           viewDistance: number): void {

        if (this.yPosition < viewStart || viewStart + viewDistance < this.yPosition)
            return;

        const leftDown = positionCalculation(
            new Coordinate3D(0, this.yPosition - viewStart, 0),
            center, wordSize, canvasSize, distance);
        const topRight = positionCalculation(
            new Coordinate3D(wordSize.w, this.yPosition - viewStart, wordSize.h),
            center, wordSize, canvasSize, distance);

        context.fillRect(leftDown.x, topRight.y, topRight.x - leftDown.x, leftDown.y - topRight.y);
    }

}
