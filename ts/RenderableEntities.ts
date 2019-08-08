import {Coordinate, Coordinate3D, Rect} from "./Entities";
import {positionCalculation} from "./positionCalculation";
import {Renderer, RenderStyle} from "./Renderer";

export abstract class Renderable {
    abstract render(context: CanvasRenderingContext2D,
                    canvasSize: Rect,
                    center: Coordinate,
                    wordSize: Rect,
                    distance: number,
                    viewStart: number,
                    viewDistance: number): void;
}

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

export class ColorRenderable extends Renderable {
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
        const rightTopFront = new Coordinate3D(x + dx, y, z + dz);
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
                private moved: number) {
        super();
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        const {width, height, depth, moved} = this;
        const pos = Math.floor(moved);
        for (let i = 0; i <= width; i++) {
            yield [
                new Coordinate3D(i, pos, 0),
                new Coordinate3D(i, depth + pos, 0)
            ];
            yield [
                new Coordinate3D(i, pos, height),
                new Coordinate3D(i, depth + pos, height)
            ];
        }
        for (let i = 0; i <= height; i++) {
            yield [
                new Coordinate3D(0, pos, i),
                new Coordinate3D(0, depth + pos, i)
            ];
            yield [
                new Coordinate3D(width, pos, i),
                new Coordinate3D(width, depth + pos, i)
            ];
        }
        for (let i = 0; i <= depth; i++) {
            yield [
                new Coordinate3D(0, i + pos, 0),
                new Coordinate3D(width, i + pos, 0)
            ];
            yield [
                new Coordinate3D(width, i + pos, 0),
                new Coordinate3D(width, i + pos, height)
            ];
            yield [
                new Coordinate3D(width, i + pos, height),
                new Coordinate3D(0, i + pos, height)
            ];
            yield [
                new Coordinate3D(0, i + pos, height),
                new Coordinate3D(0, i + pos, 0)
            ]
        }
    }

}

export class RocketRenderable extends LineRenderable {
    constructor(private x: number, private y: number, private z: number) {
        super();
    }

    * getPoints(): IterableIterator<Coordinate3D> {
        //TODO
        return undefined;
    }

    * joins(): IterableIterator<[Coordinate3D, Coordinate3D]> {
        yield* (new RenderableCube(this.x - 0.1, this.y - 0.8, this.z - 0.05, 0.2, 0.8, 0.1)).joins();
        yield* [
            [
                new Coordinate3D(this.x - 0.1, this.y, this.z - 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
            [
                new Coordinate3D(this.x + 0.1, this.y, this.z - 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
            [
                new Coordinate3D(this.x - 0.1, this.y, this.z + 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
            [
                new Coordinate3D(this.x + 0.1, this.y, this.z + 0.05),
                new Coordinate3D(this.x, this.y + 0.9, this.z),
            ],
        ];
    }

}

export class TextRenderable extends Renderable {
    private lines: string[] = null;
    private renderPosition: Coordinate = null;

    constructor(private text: string,
                private position: Coordinate,
                private fontSize: number,
                private horizontalAlign: CanvasTextAlign,
                private verticalAlign: CanvasTextAlign,
                private maxSize: Coordinate = null) {
        super();
    }

    // source: https://stackoverflow.com/a/16599668
    private getLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];

        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect): void {

        // compute the properties for the first time
        // TODO handle font loading
        if (!this.lines || true) {
            this.lines = this.getLines(context, this.text, this.maxSize.x);
            this.renderPosition = new Coordinate(this.position.x, this.position.y);
            switch (this.horizontalAlign) {
                case "right":
                    this.renderPosition.x += this.maxSize.x;
                    break;
                case "center":
                    this.renderPosition.x += this.maxSize.x / 2;
                    break;
                case "left":
                default:
                    break;
            }
            const textHeight = this.lines.length * this.fontSize +
                (this.lines.length - 1) * 0.3 * this.fontSize;
            switch(this.verticalAlign) {
                case "end":
                    this.renderPosition.y += this.maxSize.y - textHeight;
                    break;
                case "center":
                    this.renderPosition.y += this.maxSize.y / 2 - textHeight / 2;
                    break;
                case "start":
                default:
                    break;
            }
        }

        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];
            context.fillText(line,
                this.renderPosition.x,
                this.renderPosition.y + i * this.fontSize * 1.3);
        }
    }

}
