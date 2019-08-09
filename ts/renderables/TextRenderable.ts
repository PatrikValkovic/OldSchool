import {Coordinate, Rect} from "../Entities";
import {Renderable} from "./Renderable";

export class TextRenderable extends Renderable {
    private lines: string[] = null;
    private renderPosition: Coordinate = null;

    constructor(private text: string,
                private position: Coordinate,
                private fontSize: number,
                private horizontalAlign: CanvasTextAlign,
                private verticalAlign: CanvasTextAlign,
                private maxSize: Rect = null) {
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

        const maxSize = this.maxSize || canvasSize;

        // compute the properties for the first time
        // TODO handle font loading
        if (!this.lines || true) {
            this.lines = this.getLines(context, this.text, maxSize.w);
            this.renderPosition = new Coordinate(this.position.x, this.position.y);
            switch (this.horizontalAlign) {
                case "right":
                    this.renderPosition.x += maxSize.w;
                    break;
                case "center":
                    this.renderPosition.x += maxSize.w / 2;
                    break;
                case "left":
                default:
                    break;
            }
            const textHeight = this.lines.length * this.fontSize +
                (this.lines.length - 1) * 0.3 * this.fontSize;
            switch (this.verticalAlign) {
                case "end":
                    this.renderPosition.y += maxSize.h - textHeight;
                    break;
                case "center":
                    this.renderPosition.y += maxSize.h / 2 - textHeight / 2;
                    break;
                case "start":
                default:
                    break;
            }
        }

        const oldTextAlignment = context.textAlign;
        context.textAlign = this.horizontalAlign;
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];
            context.fillText(line,
                this.renderPosition.x,
                this.renderPosition.y + i * this.fontSize * 1.3 + this.fontSize);
        }
        context.textAlign = oldTextAlignment;
    }

}
