import {TextWithPictureLevel} from "./TextWithPictureLevel";
import {sound, SoundWrapper} from "../SoundEngine";

export class Level10 extends TextWithPictureLevel {

    private wrapper: SoundWrapper;

    constructor(done){
        super(
            "res/img/Space_Captain.png",
            "Now similar missions is ahead. Except, you will be testing this new plane UH-250, that has improved radar. Do not be confused.",
            'left',
            36
        );

        sound().getLooping().forEach(val => val.gain.gain.value = 0.1);

        sound().prepare("res/sound/radar_speech.mp3").then(buffer => {
           this.wrapper = sound().playNow(buffer);
           this.wrapper.buffer.addEventListener("ended", done);
        });
    }

    skipped() {
        this.wrapper.buffer.stop(0);
    }

}
