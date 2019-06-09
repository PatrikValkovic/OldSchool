import {Renderer} from "./Renderer";

export interface ILevel {

    nextFrame(): void;

    update(delta: number): void;

    finished(): boolean;

    render(renderer: Renderer): void;
}
