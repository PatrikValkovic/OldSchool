class Coordinate {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

class Coordinate3D extends Coordinate {
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y);
        this.z = z;
    }
}

class Rect {
    public h: number;
    public w: number;

    constructor(h: number, w: number) {
        this.h = h;
        this.w = w;
    }
}
