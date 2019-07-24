import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {settings} from "../Settings";

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
        renderer.clear({fill: '#FFFFFF'});

        const c = renderer.context();
        const text = 'Press Enter to start';
        c.fillStyle = '#000000';
        c.textAlign = 'center';
        c.font = `40px "${settings().font}"`;
        c.fillText(text, c.canvas.width / 2, c.canvas.height / 2 + 30, c.canvas.width);
    }

    finished(): boolean {
        return this.shouldEnd;
    }

}
