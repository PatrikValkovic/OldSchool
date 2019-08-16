import _ = require("lodash");
// @ts-ignore
import deepFreeze = require("deepFreeze");


export abstract class GameEntity<State> {
    public state: State;
    protected activeState: State;

    applyState() {
        this.activeState = deepFreeze(this.state);
    }

    rollbackState() {
        this.state = _.cloneDeep(this.activeState);
    }
}
