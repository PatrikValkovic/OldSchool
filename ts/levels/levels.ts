import {ILevel} from "../ILevel";
import {Level01} from "./Level01";
import {LevelTesting} from "./LevelTesting";
import {Level02} from "./Level02";
import {Level03} from "./Level03";
import {SkippableLevel} from "./SkippableLevel";
import {TimedLevel} from "./TimedLevel";
import {TextLevel} from "./TextLevel";

export function* levels(): IterableIterator<ILevel> {

    //yield new TextLevel("Hello here and welcome to my game. I am so happy that you are here and this is sooo long text", 40);
    //yield new LevelTesting();

    yield new Level01();
    yield new SkippableLevel(
        new TimedLevel(
            (timeoutInvoke) => new Level02(timeoutInvoke),
            6000),
        '#FFFFFF');
    yield new SkippableLevel(
        new TimedLevel(
            (timeoutInvoke) => new Level03(timeoutInvoke),
            6000),
        '#000000');
    yield new LevelTesting();
}
