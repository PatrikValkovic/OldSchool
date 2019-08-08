import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";


export class TextLevel implements ILevel {


    collisions(): void {
    }

    finished(): boolean {
        return false;
    }

    nextFrame(): void {
    }

    render(renderer: Renderer): void {
    }

    update(delta: number, events: EventEngine): void {
    }

}
