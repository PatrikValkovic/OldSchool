import {Renderable} from "./Renderable";
import {Renderer, RenderStyle} from "../Renderer";
import {Coordinate, Rect} from "../Entities";

export class StyleRenderable extends Renderable {
    private readonly style: RenderStyle;
    private readonly obj: Renderable;

    constructor(style: RenderStyle, obj: Renderable) {
        super();
        this.style = style;
        this.obj = obj;
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect,
           center: Coordinate,
           wordSize: Rect,
           distance: number,
           viewStart: number,
           viewDistance: number): void {
        Renderer.setStyle(this.style, context);
        this.obj.render(context, canvasSize, center, wordSize, distance, viewStart, viewDistance)
    }
}
