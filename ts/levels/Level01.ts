import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {settings} from "../Settings";
import {Coordinate} from "../Entities";
import {TextRenderable} from "../renderables/TextRenderable";

export class Level01 implements ILevel {

    private shouldEnd = false;

    constructor() {
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        this.shouldEnd = events.getState().pressed.Enter;
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {
        renderer.newFrame();
        renderer.clear({fill: '#FFFFFF'});

        renderer.setStyle({
            fill: '#000000',
            font: `40px "${settings().font}"`,
        });

        renderer.render(new TextRenderable(
           'Press Enter to start',
           new Coordinate(0, 0),
           40,
           'center',
           'center'
        ));
    }

    finished(): boolean {
        return this.shouldEnd;
    }

}
