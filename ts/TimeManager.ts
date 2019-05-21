export class TimeManager {
    private ticks: number[];

    constructor() {
        this.ticks = [performance.now()];
    }

    newFrame() {
        this.ticks.push(performance.now());
    }

    reportLastSecond() {
        const now = performance.now();
        this.ticks = this.ticks.filter(stamp => stamp > now - 1000);
        console.log("AVG FPS: ", this.ticks.length);
    }

    reportCurrent() {
        const size = this.ticks.length;
        console.log("FPS: ", 1000 / (this.ticks[size-1] - this.ticks[size-2]))
    }

    delta() {
        const size = this.ticks.length;
        return (this.ticks[size-1] - this.ticks[size-2]) / 1000.0;
    }
}
