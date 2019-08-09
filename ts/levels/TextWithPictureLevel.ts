import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {StyleRenderable} from "../renderables/StyleRenderable";
import {BorderRenderable} from "../renderables/BorderRenderable";
import {ImageRenderable} from "../renderables/ImageRenderable";
import {Coordinate, Rect} from "../Entities";

export class TextWithPictureLevel implements ILevel {

    private imgSource: CanvasImageSource;

    constructor(img: string,
                private text: string,
                private imgPos: 'left' | 'right' = 'left') {
        const source = new Image();
        source.addEventListener('load', () => this.imgSource = source);
        source.src = img;
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {

        const borders = 25;
        renderer.render(new StyleRenderable(
            {fill: '#FF0000'},
            new BorderRenderable(borders)
        ));

        const h = <number>renderer.context().canvas.height - 2 * borders;
        const ratio = <number>this.imgSource.height / <number>this.imgSource.width;
        const w = h / ratio;
        const x = this.imgPos === 'left' ? 0 : <number>renderer.context().canvas.width - borders - w;
        renderer.render(
            new ImageRenderable(
                this.imgSource,
                new Coordinate(x, borders),
                new Rect(<number>this.imgSource.width, <number>this.imgSource.height),
                new Coordinate(0, 0),
                new Rect(w, h),
            )
        );

    }

    finished(): boolean {
        return false;
    }
}
