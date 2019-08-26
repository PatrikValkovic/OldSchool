import {ILevel} from "./ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {settings} from "../Settings";

export class SkippableLevel implements ILevel
{
    private shouldEnd = false;

    constructor(private innerLevel: ILevel,
                private foreground: string = '#FFFFFF',
                private skipped: (level: ILevel) => void = null){
    }

    nextFrame(): void {
        this.innerLevel.nextFrame();
    }

    update(delta: number, events: EventEngine): void {
        this.shouldEnd = events.getState().pressed.Enter;
        if(this.shouldEnd && this.skipped)
            this.skipped(this.innerLevel);
        this.innerLevel.update(delta, events);
    }

    collisions(): void {
        this.innerLevel.collisions();
    }


    render(renderer: Renderer): void {
        this.innerLevel.render(renderer);

        const c = renderer.context();
        renderer.setStyle({
            fill: this.foreground,
            font: `12px "${settings().font}"`,
            textAlign: 'left',
        });
        c.fillText("Press Enter to skip", 4, 16);
    }

    finished(): (() => ILevel) | ILevel | boolean {
        return this.shouldEnd || this.innerLevel.finished();
    }

}
