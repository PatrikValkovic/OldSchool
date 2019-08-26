import {Renderable} from "./Renderable";
import {Rect} from "../Entities";
import {ImageRenderable} from "./ImageRenderable";

export class AnimatedImageRenderable extends Renderable {

    private currentTime = 0;

    constructor(private images: ImageRenderable[],
                private changeTime: number,
                private emptyTime: number = 0) {
        super();
    }

    update(delta: number){
        this.currentTime += delta;

        this.currentTime %= this.images.length * this.changeTime + this.emptyTime;
    }

    render(context: CanvasRenderingContext2D,
           canvasSize: Rect): void {

        const i = Math.floor(this.currentTime / this.changeTime);
        if(i < this.images.length)
            this.images[i].render(context, canvasSize);
    }

}
