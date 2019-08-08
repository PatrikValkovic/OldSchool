import {Coordinate, Coordinate3D, Rect} from "./Entities";
import {positionCalculation} from "./positionCalculation";
import {Renderable} from "./RenderableEntities";

export type RenderStyle = {
    fill?: string,
    stroke?: string,
    width?: number,
    font?: string,
    textAlign?: CanvasTextAlign,
};

export class Renderer {
    private c: CanvasRenderingContext2D;

    private center: Coordinate;
    private wordSize: Rect;
    private canvasSize: Rect = new Rect(0, 0);
    private distance: number;

    private viewStart: number;
    private viewDistance: number;

    constructor(context: CanvasRenderingContext2D) {
        this.c = context;
    }

    context(): CanvasRenderingContext2D {
        return this.c;
    }

    public static setStyle(style: RenderStyle, context: CanvasRenderingContext2D) {
        if (style) {
            const {fill, stroke, width, font, textAlign} = style;
            context.fillStyle = fill || context.fillStyle;
            context.strokeStyle = stroke || context.strokeStyle;
            context.lineWidth = width || context.lineWidth;
            context.font = font || context.font;
            context.textAlign = textAlign || textAlign;
        }
    }

    public static getRenderMethod(style: RenderStyle, context: CanvasRenderingContext2D) {
        if (style && style.fill) {
            return context.fill.bind(context);
        }
        return context.stroke.bind(context);
    }

    clear(style: RenderStyle) {
        this.setStyle(style);
        this.c.fillRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    }

    setStyle(style: RenderStyle){
        Renderer.setStyle(style, this.c);
    }

    newFrame(center: Coordinate,
                    wordSize: Rect,
                    distance: number,
                    viewStart: number,
                    viewDistance: number,
                    background: string = '#FFFFFF'){
        this.center = center;
        this.wordSize = wordSize;
        this.distance = distance;
        this.canvasSize.w = this.c.canvas.width;
        this.canvasSize.h = this.c.canvas.height;
        this.viewStart = viewStart;
        this.viewDistance = viewDistance;

        this.clear({fill: background});
    }

    point(point: Coordinate3D, radius: number = 1, style: RenderStyle = null) {
        Renderer.setStyle(style, this.c);
        const p = positionCalculation(point, this.center, this.wordSize, this.canvasSize, this.distance);
        this.c.beginPath();
        this.c.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        Renderer.getRenderMethod(style, this.c)();
    }

    line(from: Coordinate3D, to: Coordinate3D, style: RenderStyle = null){
        Renderer.setStyle(style, this.c);
        const f = positionCalculation(from, this.center, this.wordSize, this.canvasSize, this.distance);
        const t = positionCalculation(to, this.center, this.wordSize, this.canvasSize, this.distance);
        this.c.beginPath();
        this.c.moveTo(f.x, f.y);
        this.c.lineTo(t.x, t.y);
        this.c.stroke();
    }

    lines(lines: [Coordinate3D, Coordinate3D][], style: RenderStyle = null){
        for(const line of lines){
            this.line(line[0], line[1], style);
        }
    }

    render(o: Renderable){
        o.render(this.c,
            this.center,
            this.wordSize,
            this.canvasSize,
            this.distance,
            this.viewStart,
            this.viewDistance);
    }
}
