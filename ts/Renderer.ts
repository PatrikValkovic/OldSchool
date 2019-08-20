import {Coordinate, Coordinate3D, Rect} from "./Entities";
import {positionCalculation} from "./utils/positionCalculation";
import {Renderable} from "./renderables/Renderable";

export type RenderStyle = {
    fill?: string,
    stroke?: string,
    width?: number,
    font?: string,
    textAlign?: CanvasTextAlign,
};

export class Renderer {
    private readonly c: CanvasRenderingContext2D;

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

    newFrame(center: Coordinate = null,
                    wordSize: Rect = null,
                    distance: number = null,
                    viewStart: number = null,
                    viewDistance: number = null,
                    background: string = '#FFFFFF'){
        this.center = center || this.center;
        this.wordSize = wordSize || this.wordSize;
        this.distance = distance || this.distance;
        this.canvasSize.w = this.c.canvas.width;
        this.canvasSize.h = this.c.canvas.height;
        this.viewStart = viewStart || this.viewStart;
        this.viewDistance = viewDistance || this.viewDistance;

        this.clear({fill: background});
    }

    pointPosition(point: Coordinate3D): Coordinate {
        return positionCalculation(point, this.center, this.wordSize, this.canvasSize, this.distance);
    }

    point(point: Coordinate3D, radius: number = 1, style: RenderStyle = null) {
        Renderer.setStyle(style, this.c);
        const p = this.pointPosition(point);
        this.c.beginPath();
        this.c.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        Renderer.getRenderMethod(style, this.c)();
    }

    line(from: Coordinate3D, to: Coordinate3D, style: RenderStyle = null){
        Renderer.setStyle(style, this.c);
        const f = this.pointPosition(from);
        const t = this.pointPosition(to);
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
        o.render(
            this.c,
            this.canvasSize,
            this.center,
            this.wordSize,
            this.distance,
            this.viewStart,
            this.viewDistance,
        );
    }
}
