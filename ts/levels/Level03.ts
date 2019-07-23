import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";

export class Level03 implements ILevel {
    private image;

    constructor(timeoutInvoke: () => void) {
        const image = new Image();
        image.addEventListener('load', () => {
            this.image = image;
            timeoutInvoke();
        });
        image.src = "res/img/logo.jpg";
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {
        if(this.image){
            renderer.clear({fill: '#FFFFFF'});
            const c = renderer.context();
            c.drawImage(this.image, 0, 0, c.canvas.width, c.canvas.height);
        }
    }

    finished(): boolean {
        return false;
    }

}
