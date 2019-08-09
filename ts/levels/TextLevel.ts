import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {settings} from "../Settings";
import {Coordinate, Rect} from "../Entities";
import {TextRenderable} from "../renderables/TextRenderable";


export class TextLevel implements ILevel {
    private renderableText: TextRenderable = null;

    constructor(private text: string,private fontSize: number) {
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {
        renderer.newFrame();
        const c = renderer.context();

        renderer.clear({fill: '#FFFFFF'});

        const availableSpace = {
            w: c.canvas.width,
            h: c.canvas.height,
        };

        // TODO draw borders
        const borders = 25;
        //renderer.setStyle({fill: '#FF0000'});
        //c.fillRect(0, 0, borders, availableSpace.h);
        //c.fillRect(0, 0, availableSpace.w, borders);
        //c.fillRect(availableSpace.w - borders, 0, borders, availableSpace.h);
        //c.fillRect(0, availableSpace.h - borders, availableSpace.w, borders);

        // draw text
        if(!this.renderableText){
            const posx = borders + this.fontSize * 0.3;
            const posy = this.fontSize * 1.3 + borders;
            const maxHeight =  availableSpace.h - this.fontSize * 1.6;
            const maxWidth = availableSpace.w - 2 * posx;
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
