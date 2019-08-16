import {TextWithPictureLevel} from "./TextWithPictureLevel";
import {sound} from "../SoundEngine";

export class Level04 extends TextWithPictureLevel {

    constructor(){
        super(
            "res/img/Space_Captain.png",
            //TODO write the text and convert it to sound
            "Hello soldier, you have been picked from number of other cadets.",
        );

        console.log(sound().getLooping());
        sound().getLooping().forEach(val => val.gain.gain.value = 0.1);
    }

}
