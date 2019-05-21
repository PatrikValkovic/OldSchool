import {Coordinate, Coordinate3D, Rect} from "./entities";
import {positionCalculation} from "./positionCalculation";

export class Renderer {
    private c: CanvasRenderingContext2D;

    private center: Coordinate;
    private wordSize: Rect;
    private canvasSize: Rect = new Rect(0, 0);
    private distance: number;

    constructor(context: CanvasRenderingContext2D) {
        this.c = context;
    }

    private setStyle(style: { fill?: string, stroke?: string } = null) {
        if (style) {
            const {fill, stroke} = style;
            this.c.fillStyle = fill || this.c.fillStyle;
            this.c.strokeStyle = stroke || this.c.strokeStyle;
        }
    }

    private getRenderMethod(style: { fill?: string, stroke?: string } = null){
        if (style && style.fill) {
            return this.c.fill.bind(this.c);
        }
        return this.c.stroke.bind(this.c);
    }

    public newFrame(center: Coordinate,
                    wordSize: Rect,
                    distance: number,
                    background: string = '#FFFFFF'){
        this.center = center;
        this.wordSize = wordSize;
        this.distance = distance;
        this.canvasSize.w = this.c.canvas.width;
        this.canvasSize.h = this.c.canvas.height;

        this.c.fillStyle = background;
        this.c.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    }

    point(point: Coordinate3D, radius: number = 1, style: { fill?: string, stroke?: string } = null) {
        this.setStyle(style);
        const p = positionCalculation(point, this.center, this.wordSize, this.canvasSize, this.distance);
        this.c.beginPath();
        this.c.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        this.getRenderMethod(style)();
    }

    line(from: Coordinate3D, to: Coordinate3D, width: number = null, stroke: string = null){
        this.c.lineWidth = width || this.c.lineWidth;
        this.c.strokeStyle = stroke || this.c.strokeStyle;
        const f = positionCalculation(from, this.center, this.wordSize, this.canvasSize, this.distance);
        const t = positionCalculation(to, this.center, this.wordSize, this.canvasSize, this.distance);
        this.c.beginPath();
        this.c.moveTo(f.x, f.y);
        this.c.lineTo(t.x, t.y);
        this.c.stroke();
    }

    lines(lines: [Coordinate3D, Coordinate3D][], width: number = null, stroke: string = null ){
        for(const line of lines){
            this.line(line[0], line[1], width, stroke);
        }
    }
}
