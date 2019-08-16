import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";

export interface ILevel {

    nextFrame(): void;

    update(delta: number, events: EventEngine): void;

    collisions(): void;

    finished(): boolean;

    render(renderer: Renderer): void;
}
