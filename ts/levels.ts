import {ILevel} from "./ILevel";
import {Level01} from "./levels/Level01";
import {LevelTesting} from "./levels/LevelTesting";
import {Level02} from "./levels/Level02";
import {Level03} from "./levels/Level03";

export function *levels(): IterableIterator<ILevel> {
    yield new Level01();
    yield new Level02();
    yield new Level03();
    yield new LevelTesting();
}
