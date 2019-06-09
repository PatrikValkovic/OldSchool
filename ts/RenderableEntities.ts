import {Coordinate, Coordinate3D, Rect} from "./Entities";
import {positionCalculation} from "./positionCalculation";

export type RenderStyle = { fill?: string, stroke?: string, width?: number };

export abstract class Renderable {
    abstract render(context: CanvasRenderingContext2D,
                    center: Coordinate,
                    wordSize: Rect,
                    canvasSize: Rect,
                    distance: number): void;
}

export abstract class LineRenderable extends Renderable {
    abstract getPoints(): IterableIterator<Coordinate3D>;

    abstract joins(): IterableIterator<[Coordinate3D, Coordinate3D]>;

    private static p: Coordinate[] = [];

    render(context: CanvasRenderingContext2D,
           center: Coordinate,
           wordSize: Rect,
           canvasSize: Rect,
           distance: number) {
        //TODO optimize
        for (const join of this.joins()) {
            const f = positionCalculation(join[0], center, wordSize, canvasSize, distance);
            const s = positionCalculation(join[1], center, wordSize, canvasSize, distance);
            context.beginPath();
            context.moveTo(f.x, f.y);
            context.lineTo(s.x, s.y);
            context.stroke();
        }
    }
}

export class ColorRenderable extends Renderable {
    private readonly style: RenderStyle;
    private readonly obj: Renderable;

    constructor(style: RenderStyle, obj: Renderable) {
        super();
        this.style = style;
        this.obj = obj;
    }

    public static setStyle(style: RenderStyle, context: CanvasRenderingContext2D) {
        if (style) {
            const {fill, stroke, width} = style;
            context.fillStyle = fill || context.fillStyle;
            context.strokeStyle = stroke || context.strokeStyle;
            context.lineWidth = width || context.lineWidth;
        }
    }

    public static getRenderMethod(style: RenderStyle, context: CanvasRenderingContext2D) {
        if (style && style.fill) {
            return context.fill.bind(context);
        }
        return context.stroke.bind(context);
    }

    render(context: CanvasRenderingContext2D,
           center: Coordinate,
           wordSize: Rect,
           canvasSize: Rect,
           distance: number): void {
        ColorRenderable.setStyle(this.style, context);
        this.obj.render(context, center, wordSize, canvasSize, distance)
    }
}

export class RenderableCube extends LineRenderable {
    private readonly coords: Coordinate3D;
    private readonly diffs: Coordinate3D;

    constructor(x: number, y: number, z: number, dx: number = 1, dy: number = 1, dz: number = 1) {
        super();
        this.coords = new Coordinate3D(x, y, z);
        this.diffs = new Coordinate3D(dx, dy, dz);
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        for (let x = 0; x < 1; x++)
            for (let y = 0; y < 1; y++)
                for (let z = 0; z < 1; z++)
                    yield new Coordinate3D(
                        this.coords.x + x,
                        this.coords.y + y,
                        this.coords.z + z);
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        const {x, y, z} = this.coords;
        const {dx, dy, dz} = {dx: this.diffs.x, dy: this.diffs.y, dz: this.diffs.z};
        const leftTopFront = new Coordinate3D(x, y, z + dz);
        const rightTopFront = new Coordinate3D(x +dx, y, z + dz);
        const leftBottomFront = new Coordinate3D(x, y, z);
        const rightBottomFront = new Coordinate3D(x + dx, y, z);
        const leftTopBack = new Coordinate3D(x, y + dy, z + dz);
        const rightTopBack = new Coordinate3D(x + dx, y + dy, z + dz);
        const leftBottomBack = new Coordinate3D(x, y + dy, z);
        const rightBottomBack = new Coordinate3D(x + dx, y + dy, z);

        yield* [
            [leftTopFront, rightTopFront],
            [leftTopFront, leftBottomFront],
            [leftTopFront, leftTopBack],
            [leftBottomFront, rightBottomFront],
            [leftBottomFront, leftBottomBack],
            [rightTopFront, rightBottomFront],
            [rightTopFront, rightTopBack],
            [rightBottomFront, rightBottomBack],
            [leftTopBack, rightTopBack],
            [leftTopBack, leftBottomBack],
            [leftBottomBack, rightBottomBack],
            [rightTopBack, rightBottomBack]
        ];
    }
}

export class WorldRenderable extends LineRenderable {
    constructor(private width: number,
                private height: number,
                private depth: number,
                private moved: number){
        super();
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        const {width, height, depth, moved} = this;
        for (let i = 0; i <= width; i++) {
            yield [
                new Coordinate3D(i, 0 - moved % 1, 0),
                new Coordinate3D(i, depth - moved % 1, 0)
            ];
            yield [
                new Coordinate3D(i, 0 - moved % 1, height),
                new Coordinate3D(i, depth - moved % 1, height)
            ];
        }
        for (let i = 0; i <= height; i++) {
            yield [
                new Coordinate3D(0, 0 - moved % 1, i),
                new Coordinate3D(0, depth - moved % 1, i)
            ];
            yield [
                new Coordinate3D(width, 0 - moved % 1, i),
                new Coordinate3D(width, depth - moved % 1, i)
            ];
        }
        for (let i = 0; i <= depth; i++) {
            yield [
                new Coordinate3D(0, i - moved % 1, 0),
                new Coordinate3D(width, i - moved % 1, 0)
            ];
            yield [
                new Coordinate3D(width, i - moved % 1, 0),
                new Coordinate3D(width, i - moved % 1, height)
            ];
            yield [
                new Coordinate3D(width, i - moved % 1, height),
                new Coordinate3D(0, i - moved % 1, height)
            ];
            yield [
                new Coordinate3D(0, i - moved % 1, height),
                new Coordinate3D(0, i - moved % 1, 0)
            ]
        }
    }

}

export class RocketRenderable extends LineRenderable{
    constructor(private x: number, private y: number, private z:number){
        super();
    }

    *getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    *joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        yield* (new RenderableCube(this.x - 0.1, this.y-0.8, this.z-0.05, 0.2,0.8, 0.1)).joins();
        yield* [
            [
                new Coordinate3D(this.x-0.1, this.y, this.z-0.05),
                new Coordinate3D(this.x, this.y+0.9, this.z),
            ],
            [
                new Coordinate3D(this.x+0.1, this.y, this.z-0.05),
                new Coordinate3D(this.x, this.y+0.9, this.z),
            ],
            [
                new Coordinate3D(this.x-0.1, this.y, this.z+0.05),
                new Coordinate3D(this.x, this.y+0.9, this.z),
            ],
            [
                new Coordinate3D(this.x+0.1, this.y, this.z+0.05),
                new Coordinate3D(this.x, this.y+0.9, this.z),
            ],
        ];
    }

}
