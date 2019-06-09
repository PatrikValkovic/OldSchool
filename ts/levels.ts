import {ILevel} from "./ILevel";
import {Level01} from "./levels/Level01";

export function *levels(): IterableIterator<ILevel> {
    yield new Level01();
}
