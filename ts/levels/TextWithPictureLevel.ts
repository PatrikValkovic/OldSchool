import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {StyleRenderable} from "../renderables/StyleRenderable";
import {BorderRenderable} from "../renderables/BorderRenderable";
import {ImageRenderable} from "../renderables/ImageRenderable";
import {Coordinate, Rect} from "../Entities";
import {TextRenderable} from "../renderables/TextRenderable";
import {settings} from "../Settings";

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
        const phi = (1 + Math.sqrt(5)) / 2;
        const phi_ = 1 / phi;
        renderer.render(
            new ImageRenderable(
                this.imgSource,
                new Coordinate(x + w * (1 - phi_) / 2, borders + w * (1 - phi_) / 2),
                new Rect(<number>this.imgSource.width, <number>this.imgSource.height),
                new Coordinate(0, 0),
                new Rect(w * phi_, h * phi_),
            )
        );

        const wText = <number>renderer.context().canvas.width - 2 * borders - w;
        const fontSize = 26;
        const textBorders = fontSize * phi;
        const xText = this.imgPos === 'left' ? w + borders : borders + textBorders;
        renderer.setStyle({
            fill: '#000000',
            font: `${fontSize}px "${settings().font}"`,
            textAlign: 'left'
        });
        renderer.render(new TextRenderable(
           this.text,
           new Coordinate(xText, borders + textBorders),
           fontSize,
           'left',
           'start',
           new Rect(wText - textBorders, Infinity)
        ));

    }

    finished(): boolean {
        return false;
    }
}
