import {ILevel} from "./ILevel";
import {Level01} from "./Level01";
import {LevelTesting} from "./LevelTesting";
import {Level02} from "./Level02";
import {Level03} from "./Level03";
import {SkippableLevel} from "./SkippableLevel";
import {TimedLevel} from "./TimedLevel";
import {Level04} from "./Level04";
import {Level05} from "./Level05";
import {Level06} from "./Level06";
import {Level07} from "./Level07";
import {Level08} from "./Level08";
import {Level09} from "./Level09";
import {Level10} from "./Level10";
import {Level11} from "./Level11";
import {Level12} from "./Level12";

export function* levels(): IterableIterator<ILevel> {

    //yield new Level12();

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
        new TimedLevel(
            timeoutInvoke => new Level04(timeoutInvoke),
            0),
        '#000000',
        (t: TimedLevel) => {
            (<Level04>t.innerLevel).skipped();
        }
    );

    // Horizontal movement test
    yield new SkippableLevel(
        new Level05(),
        '#000000'
    );

    // How to avoid obstacles
    yield new SkippableLevel(
        new TimedLevel(
            timeoutInvoke => new Level06(timeoutInvoke),
            0),
        '#000000',
        (t: TimedLevel) => {
            (<Level06>t.innerLevel).skipped();
        }
    );

    // avoid mountains
    yield new Level07();

    // asteroids speech
    yield new SkippableLevel(
        new TimedLevel(
            timeoutInvoke => new Level08(timeoutInvoke),
            0),
        '#000000',
        (t: TimedLevel) => {
            (<Level08>t.innerLevel).skipped();
        }
    );

    // asteroids
    yield new Level09();

    // updated radar
    yield new SkippableLevel(
        new TimedLevel(
            timeoutInvoke => new Level10(timeoutInvoke),
            0),
        '#000000',
        (t: TimedLevel) => {
            (<Level10>t.innerLevel).skipped();
        }
    );

    yield new Level11();

    // last level
    yield new Level12();

    //yield new LevelTesting();
}
