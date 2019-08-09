import {Renderable} from "./Renderable";
import {Coordinate, Rect} from "../Entities";

export class ImageRenderable extends Renderable {

    constructor(private image: CanvasImageSource,
                private destPos: Coordinate = new Coordinate(),
                private sourceRect: Rect = null,
                private sourcePos: Coordinate = null,
                private destRect: Rect = null) {
        super();
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect): void {

        const image = this.image;
        const sx = this.sourcePos && this.sourcePos.x;
        const sy = this.sourcePos && this.sourcePos.y;
        const sWidth = this.sourceRect && this.sourceRect.w;
        const sHeight = this.sourceRect && this.sourceRect.h;
        const dx = this.destPos.x;
        const dy = this.destPos.y;
        const dWidth = this.destRect && this.destRect.w;
        const dHeight = this.destRect && this.destRect.h;

        context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

}
