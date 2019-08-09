import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {settings} from "../Settings";
import {Coordinate, Rect} from "../Entities";
import {TextRenderable} from "../renderables/TextRenderable";
import {StyleRenderable} from "../renderables/StyleRenderable";
import {BorderRenderable} from "../renderables/BorderRenderable";


export class TextLevel implements ILevel {
    private renderableText: TextRenderable = null;

    constructor(private text: string, private fontSize: number) {
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {
        renderer.clear({fill: '#FFFFFF'});

        const borders = 25;
        renderer.render(
            new StyleRenderable(
                {fill: '#FF0000'},
                new BorderRenderable(borders)
            )
        );

        const c = renderer.context();
        const availableSpace = {
            w: c.canvas.width,
            h: c.canvas.height,
        };

        // draw text
        if (!this.renderableText) {
            const posx = borders + this.fontSize * 0.3;
            const posy = borders + this.fontSize * 0.3;
            const maxHeight = availableSpace.h - this.fontSize * 0.6 - 2 * borders;
            const maxWidth = availableSpace.w - this.fontSize * 0.6 - 2 * borders;
            this.renderableText = new TextRenderable(
                this.text,
                new Coordinate(posx, posy),
                this.fontSize,
                'left',
                'start',
                new Rect(maxWidth, maxHeight)
            );
        }

        renderer.setStyle({
            fill: '#000000',
            textAlign: "left",
            font: `${this.fontSize}px "${settings().font}"`
        });

        renderer.render(this.renderableText);
    }

    finished(): boolean {
        return false;
    }
}
