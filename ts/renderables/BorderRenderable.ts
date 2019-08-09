import {Renderable} from "./Renderable";
import {Coordinate, Rect} from "../Entities";

export class BorderRenderable extends Renderable {

    constructor(private borderSize: number,
                private pos: Coordinate = new Coordinate(),
                private size: Rect = new Rect()) {
        super();
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect): void {

        const startX = this.pos && this.pos.x || 0;
        const startY = this.pos && this.pos.y || 0;
        const width = this.size && this.size.w || canvasSize.w - startX;
        const height = this.size && this.size.h || canvasSize.h - startY;

        // TODO render borders from pictures
        context.fillRect(startX, startY, width, this.borderSize);
        context.fillRect(startX, startY, this.borderSize, height);
        context.fillRect(startX + width - this.borderSize, startY, this.borderSize, height);
        context.fillRect(startX, startY + height - this.borderSize, width, this.borderSize);
    }
}
