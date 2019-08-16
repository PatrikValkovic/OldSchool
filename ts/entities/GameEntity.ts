import _ = require("lodash");
// @ts-ignore
import deepFreeze = require("deepFreeze");


export abstract class GameEntity<State> {
    public state: State;
    protected activeState: State;

    protected constructor(defaultState: State){
        this.state = defaultState;
        this.applyState();
    }

    applyState() {
        this.activeState = _.cloneDeep(this.state);
        deepFreeze(this.activeState);
    }

    rollbackState() {
        this.state = _.cloneDeep(this.activeState);
    }
}
