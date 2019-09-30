import {TextWithPictureLevel} from "./TextWithPictureLevel";
import {sound, SoundWrapper} from "../SoundEngine";

export class Level08 extends TextWithPictureLevel {

    private wrapper: SoundWrapper;

    constructor(done){
        super(
            "res/img/Space_Captain.png",
            "Your first mission is waiting for you. Your task is to explore asteroid belt nearby. Don't forget that you are in space now, there are more than just two directions of movement.",
            'left',
            36
        );

        sound().getLooping().forEach(val => val.gain.gain.value = 0.1);

        sound().prepare("res/sound/asteroids_speech.mp3").then(buffer => {
           this.wrapper = sound().playNow(buffer);
           this.wrapper.buffer.addEventListener("ended", done);
        });
    }

    skipped() {
        this.wrapper.buffer.stop(0);
    }

}
