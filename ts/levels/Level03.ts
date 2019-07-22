import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";

export class Level03 implements ILevel {

    private shouldEnd = false;

    private image;

    constructor() {
        const image = new Image();
        image.addEventListener('load', () => {
            this.image = image;
            setTimeout(() => {this.shouldEnd = true}, 6000);
        });
        image.src = "res/img/logo.jpg";
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        if(events.getState().pressed.Enter)
            this.shouldEnd = true;
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {
        if(this.image){
            renderer.clear({fill: '#FFFFFF'});
            const c = renderer.context();
            c.drawImage(this.image, 0, 0, c.canvas.width, c.canvas.height);

            renderer.setStyle({fill: '#000000'});
            c.font = '12px Arial';
            c.textAlign = 'left';
            c.fillText("Press Enter to skip", 4, 16);
        }
    }

    finished(): boolean {
        return this.shouldEnd;
    }

}
