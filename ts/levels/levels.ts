import {ILevel} from "../ILevel";
import {Level01} from "./Level01";
import {LevelTesting} from "./LevelTesting";
import {Level02} from "./Level02";
import {Level03} from "./Level03";
import {SkippableLevel} from "./SkippableLevel";

export function* levels(): IterableIterator<ILevel> {
    //yield new LevelTesting();
    yield new Level01();
    yield new SkippableLevel(new Level02(), '#FFFFFF');
    yield new SkippableLevel(new Level03(), '#000000');
}
