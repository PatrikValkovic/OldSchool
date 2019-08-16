import {Renderable} from "./Renderable";
import {Coordinate, Coordinate3D, Rect} from "../Entities";
import {positionCalculation} from "../utils/positionCalculation";

export abstract class LineRenderable extends Renderable {
    abstract getPoints(): IterableIterator<Coordinate3D>;

    abstract joins(): IterableIterator<[Coordinate3D, Coordinate3D]>;

    private static p: Coordinate[] = [];

    private recomputePoint(originalPoint: Coordinate3D,
                           secondPoint: Coordinate3D,
                           viewStart: number,
                           viewDistance: number): Coordinate3D {
        if (originalPoint.y < viewStart) {
            const t = (viewStart - originalPoint.y) / (secondPoint.y - originalPoint.y);
            return new Coordinate3D(
                originalPoint.x + t * (secondPoint.x - originalPoint.x),
                0,
                originalPoint.z + t * (secondPoint.z - originalPoint.z)
            );
        } else if (originalPoint.y > viewStart + viewDistance) {
            const t = (viewStart + viewDistance - originalPoint.y) / (secondPoint.y - originalPoint.y);
            return new Coordinate3D(
                originalPoint.x + t * (secondPoint.x - originalPoint.x),
                viewDistance,
                originalPoint.z + t * (secondPoint.z - originalPoint.z)
            );
        } else
            return new Coordinate3D(originalPoint.x, originalPoint.y - viewStart, originalPoint.z);
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect,
           center: Coordinate,
           wordSize: Rect,
           distance: number,
           viewStart: number,
           viewDistance: number): void {
        //TODO optimize
        for (const join of this.joins()) {
            if ((join[0].y > viewStart + viewDistance && join[1].y > viewStart + viewDistance) ||
                (join[0].y < viewStart && join[1].y < viewStart))
                continue;
            const firstPoint = this.recomputePoint(join[0], join[1], viewStart, viewDistance);
            const secondPoint = this.recomputePoint(join[1], join[0], viewStart, viewDistance);
            const f = positionCalculation(firstPoint, center, wordSize, canvasSize, distance);
            const s = positionCalculation(secondPoint, center, wordSize, canvasSize, distance);
            context.beginPath();
            context.moveTo(f.x, f.y);
            context.lineTo(s.x, s.y);
            context.stroke();
        }
    }
}
