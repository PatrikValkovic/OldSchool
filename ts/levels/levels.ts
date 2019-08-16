import {ILevel} from "./ILevel";
import {Level01} from "./Level01";
import {LevelTesting} from "./LevelTesting";
import {Level02} from "./Level02";
import {Level03} from "./Level03";
import {SkippableLevel} from "./SkippableLevel";
import {TimedLevel} from "./TimedLevel";
import {SoundLevel} from "./SoundLevel";
import {Level04} from "./Level04";

export function* levels(): IterableIterator<ILevel> {

    yield new LevelTesting();

    // Press enter to
    yield new Level01();

    // ITnetwork logo
    yield new SkippableLevel(
        new TimedLevel(
            (timeoutInvoke) => new Level02(timeoutInvoke),
            6000),
        '#FFFFFF');

    // Warfrog Interactive logo
    yield new SkippableLevel(
        new TimedLevel(
            (timeoutInvoke) => new Level03(timeoutInvoke),
            6000),
        '#000000');

    // Introduction conversation
    yield new SkippableLevel(
        new TimedLevel(timeoutInvoke =>
        new SoundLevel(
            "res/sound/introduction_speech.mp3",
            timeoutInvoke,
            new Level04()
        ), 0),
        '#000000'
    );

    yield new LevelTesting();
}
