import {ILevel} from "./ILevel";
import {EventEngine} from "../EventEngine";
import {Renderer} from "../Renderer";
import {sound} from "../SoundEngine";

export class SoundLevel implements ILevel {
    private level: ILevel;

    constructor(media: string, doneCallback: () => void, innerLevel: ILevel = null) {
        sound().prepare(media).then(buffer => (
            sound().playNow(buffer).buffer.addEventListener("ended", doneCallback)
        ));
        this.level = innerLevel;
    }


    collisions(): void {
        if(this.level)
            this.level.collisions();
    }

    finished(): boolean {
        if(this.level)
            return this.level.finished();
    }

    nextFrame(): void {
        if(this.level)
            this.level.nextFrame();
    }

    render(renderer: Renderer): void {
        if(this.level)
            this.level.render(renderer);
    }

    update(delta: number, events: EventEngine): void {
        if(this.level)
            this.level.update(delta, events);
    }

}
