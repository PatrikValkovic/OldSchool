import {TextWithPictureLevel} from "./TextWithPictureLevel";
import {sound, SoundWrapper} from "../SoundEngine";

export class Level12 extends TextWithPictureLevel {

    constructor(){
        super(
            "res/img/Developer.png",
            "Unfortunately, I didn't have time to fully finnish the game nor the engine. If you are interested, visit github repository PatrikValkovic/OldSchool. Thank you for playing this game.           - Developer",
            'right',
            36
        );
    }
}
