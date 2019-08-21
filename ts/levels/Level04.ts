import {TextWithPictureLevel} from "./TextWithPictureLevel";
import {sound, SoundWrapper} from "../SoundEngine";

export class Level04 extends TextWithPictureLevel {

    private wrapper: SoundWrapper;

    constructor(done){
        super(
            "res/img/Space_Captain.png",
            "Soldier, welcome to this highly classified facility of Czech Security Information Service. We built this facility without public knowledge to protect Earth against unknown threats from the Universe. You have the honor to become the first line of this protection. To achieve that, you must undergo intensive training, to be the best between all others. You gonna start with our fighter spaceships CH14, the fundamental equipment of our armament. You can see spaceship position on the radar in front of you. Use MOUSE or ARROW KEYS to control the spaceship.",
            'left',
            34
        );

        sound().getLooping().forEach(val => val.gain.gain.value = 0.1);

        sound().prepare("res/sound/introduction_speech.mp3").then(buffer => {
           this.wrapper = sound().playNow(buffer);
           this.wrapper.buffer.addEventListener("ended", done);
        });
    }

    skipped() {
        this.wrapper.buffer.stop(0);
    }

}
