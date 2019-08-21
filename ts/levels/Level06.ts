import {TextWithPictureLevel} from "./TextWithPictureLevel";
import {sound, SoundWrapper} from "../SoundEngine";

export class Level06 extends TextWithPictureLevel {

    private wrapper: SoundWrapper;

    constructor(done){
        super(
            "res/img/Space_Captain.png",
            "Great work, soldier. Your performance is extraordinary. But now, let's test your agility because that is what makes the best of the best. In this simulation, you will control the spaceship between crates and mountains. Avoid them, because if you crash into them, its gonna be a quick death.",
            'left',
            36
        );

        sound().getLooping().forEach(val => val.gain.gain.value = 0.1);

        sound().prepare("res/sound/agility_speech.mp3").then(buffer => {
           this.wrapper = sound().playNow(buffer);
           this.wrapper.buffer.addEventListener("ended", done);
        });
    }

    skipped() {
        this.wrapper.buffer.stop(0);
    }

}
