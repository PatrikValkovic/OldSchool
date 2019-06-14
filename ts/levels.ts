import {ILevel} from "./ILevel";
import {Level01} from "./levels/Level01";
import {LevelTesting} from "./levels/LevelTesting";

export function *levels(): IterableIterator<ILevel> {
    yield new Level01();
    yield new LevelTesting();
}
