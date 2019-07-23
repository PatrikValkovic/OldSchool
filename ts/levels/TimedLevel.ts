import {ILevel} from "../ILevel";
import {Renderer} from "../Renderer";
import {EventEngine} from "../EventEngine";

export class TimedLevel implements ILevel
{
    private innerLevel: ILevel;
    private shouldEnd = false;

    constructor(innerLevel: ILevel | ((timeoutInvoke: () => void) => ILevel),
                timeToShow: number){
        const timeoutCall = () => {
            setTimeout(() => this.shouldEnd = true, timeToShow);
        };
        if(typeof innerLevel === 'function'){
            this.innerLevel = innerLevel(timeoutCall);
        }
        else{
            this.innerLevel = innerLevel;
            timeoutCall();
        }
    }

    nextFrame(): void {
        this.innerLevel.nextFrame();
    }

    update(delta: number, events: EventEngine): void {
        this.innerLevel.update(delta, events);
    }

    collisions(): void {
        this.innerLevel.collisions();
    }


    render(renderer: Renderer): void {
        this.innerLevel.render(renderer);
    }

    finished(): boolean {
        return this.shouldEnd || this.innerLevel.finished();
    }

}
