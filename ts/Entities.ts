export class Coordinate {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Coordinate3D extends Coordinate {
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y);
        this.z = z;
    }
}

export class Rect {
    public h: number;
    public w: number;

    constructor(w: number = 0, h: number = 0) {
        this.h = h;
        this.w = w;
    }
}

export class Interval {
    public start: number;
    public end: number;


    constructor(start: number = 0, end: number = 0) {
        this.start = start;
        this.end = end;
    }

    public intersect(second: Interval): boolean {
        return (this.start <= second.start && second.start <= this.end) ||
            (this.start <= second.end && second.end <= this.end) ||
            (second.start <= this.start && this.start <= second.end) ||
            (second.start <= this.end && this.end <= second.end);
    }
}
