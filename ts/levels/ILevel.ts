import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";

export interface ILevel {

    nextFrame(): void;

    update(delta: number, events: EventEngine): void;

    collisions(): void;

    render(renderer: Renderer): void;

    finished(): (() => ILevel) | ILevel | boolean;
}
