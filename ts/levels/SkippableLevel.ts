import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";

export class SkippableLevel implements ILevel
{
    private shouldEnd = false;

    constructor(private innerLevel: ILevel,
                private foreground: string){
    }

    nextFrame(): void {
        this.innerLevel.nextFrame();
    }

    update(delta: number, events: EventEngine): void {
        this.shouldEnd = events.getState().pressed.Enter;
        this.innerLevel.update(delta, events);
    }

    collisions(): void {
        this.innerLevel.collisions();
    }


    render(renderer: Renderer): void {
        this.innerLevel.render(renderer);

        const c = renderer.context();
        renderer.setStyle({fill: this.foreground});
        c.font = '12px Arial';
        c.textAlign = 'left';
        c.fillText("Press Enter to skip", 4, 16);
    }

    finished(): boolean {
        return this.shouldEnd || this.innerLevel.finished();
    }

}
