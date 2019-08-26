import {ILevel} from "./ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";
import {AnimatedImageRenderable} from "../renderables/AnimatedImageRenderable";
import {ImageRenderable} from "../renderables/ImageRenderable";
import _ = require("lodash");
import {TextRenderable} from "../renderables/TextRenderable";
import {Coordinate, Rect} from "../Entities";
import {StyleRenderable} from "../renderables/StyleRenderable";
import {settings} from "../Settings";
import {sound} from "../SoundEngine";

export class LostLevel implements ILevel {

    private explosion: CanvasImageSource[];
    private renderable: AnimatedImageRenderable = null;

    constructor() {
        this.explosion = _.range(1, 19)
            .map(n => `res/img/explosion/${n}.png`)
            .map(path => {
                const img = new Image();
                img.src = path;
                return img
            });

        sound().prepare("res/sound/Soliloquy.mp3").then(buffer => sound().playInLoop(buffer));
    }

    nextFrame(): void {
    }

    update(delta: number, events: EventEngine): void {
        if (this.renderable)
            this.renderable.update(delta);
    }

    collisions(): void {
    }

    render(renderer: Renderer): void {
        renderer.clear({fill: '#000000'});

        const h = renderer.context().canvas.height;
        const w = renderer.context().canvas.width;

        if (!this.renderable && _.every(this.explosion, img => !!img.width)) {
            this.renderable = new AnimatedImageRenderable(
                this.explosion
                    .map(img => new ImageRenderable(
                        img,
                        new Coordinate(w / 2 - <number>img.width / 2, 0.5 * h / 3),
                        new Rect(<number>img.width, <number>img.height),
                        new Coordinate(),
                        new Rect(<number>img.width, h / 3)
                    )),
                0.1,
                2
            );
        }

        if(this.renderable)
            renderer.render(this.renderable);

        renderer.render(new StyleRenderable(
            {
                fill: '#FFFFFF',
                textAlign: 'center',
                font: `${Math.min(h / 4, 54)}px "${settings().font}"`,
            },
            new TextRenderable(
                "You died",
                new Coordinate(0, 2 * h / 3),
                Math.min(h / 4, 54),
                'center',
                'start'
            )
        ));
    }

    finished(): (() => ILevel) | ILevel | boolean {
        return false;
    }


}
