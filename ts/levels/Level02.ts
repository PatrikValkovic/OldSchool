import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {sound} from "../SoundEngine";

export class Level02 implements ILevel {

    private shouldEnd = false;
    private image;

    constructor() {
        const image = new Image();
        image.addEventListener('load', () => {
            this.image = image;
            setTimeout(() => {this.shouldEnd = true}, 6000);
        });
        image.src = "res/img/Intro.jpg";

        sound().prepare("res/sound/Bladehand.mp3").then((bufer) => {
           sound().playInLoop(bufer);
        });
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
        }
    }

    finished(): boolean {
        return this.shouldEnd;
    }

}
