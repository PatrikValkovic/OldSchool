import {Coordinate, Coordinate3D, Rect} from "./entities";

function _y(y: number, h: number): number{
    return h - y;
}

export function positionCalculation(point: Coordinate3D,
                             center: Coordinate,
                             word: Rect,
                             canvas: Rect,
                             distance: number,
                             c?: CanvasRenderingContext2D): Coordinate {

    const {x, y, z} = point;
    const Sx = center.x;
    const Sy = center.y;
    const {w, h} = canvas;
    const wc = word.w;
    const hc = word.h;
    const d = distance;

    const frac = Sy / Sx;
    const horiz = (Sy * y) / (d + y);
    const vert = horiz / (frac);

    const posY = (Sy-z) * vert / Sx + z;
    let posX = Sx;
    if(Math.abs(Sx - x) > Math.pow(2, -50)){
        posX = (horiz + (Sy * x)/(Sx - x))
                /
                (Sy / (Sx - x));
    }


    if(c){
        //center
        const oldFill = c.fillStyle;
        const oldStroke = c.strokeStyle;
        const oldLineWidth = c.lineWidth;
        c.lineWidth = 1;

        c.fillStyle = '#00FF00';
        c.beginPath();
        c.arc(Sx * w/wc, _y(Sy * h/hc, h), 5, 0, 2 * Math.PI);
        c.fill();

        // to center
        c.strokeStyle = 'rgba(0,0,0,0.15)';
        c.beginPath();
        c.moveTo(0, _y(0, h));
        c.lineTo(Sx * w/wc, _y(Sy * h/hc, h));
        c.stroke();

        // to center
        c.strokeStyle = 'rgba(0,0,0,0.1)';
        c.beginPath();
        c.moveTo(x * w/wc, _y(0, h));
        c.lineTo(Sx * w/wc, _y(Sy * h/hc, h));
        c.stroke();

        // to eye
        c.strokeStyle = 'rgba(0,0,0,0.1)';
        c.beginPath();
        c.moveTo(y * w/wc, _y(0, h));
        c.lineTo(-distance * w/wc, _y(Sy * h/hc, h));
        c.stroke();

        //intersect
        c.fillStyle = '#0000FF';
        c.beginPath();
        c.arc(vert * w/wc, _y(horiz * h/hc, h), 5, 0,
            2 * Math.PI);
        c.fill();

        // vert
        c.strokeStyle = 'rgba(0,0,255,0.15)';
        c.beginPath();
        c.moveTo(vert * w / wc, _y(0, h));
        c.lineTo(vert * w / wc, _y(h, h));
        c.stroke();

        // horiz
        c.strokeStyle = 'rgba(0,0,255,0.15)';
        c.beginPath();
        c.moveTo(0, _y(horiz * h/hc, h));
        c.lineTo(w, _y(horiz * h/hc, h));
        c.stroke();

        // line for x
        c.strokeStyle = 'rgba(255,0,0,0.15)';
        c.beginPath();
        c.moveTo(x * w/wc, _y(0, h));
        c.lineTo(Sx * w/wc, _y(Sy * h/hc, h));
        c.stroke();

        // line for z
        c.strokeStyle = 'rgba(255,0,0,0.15)';
        c.beginPath();
        c.moveTo(0, _y(z * h/hc, h));
        c.lineTo(Sx * w/wc, _y(Sy * h/hc, h));
        c.stroke();

        //s real x
        c.strokeStyle = 'rgba(0,255,0,0.15)';
        c.beginPath();
        c.moveTo(posX * w/wc, _y(0, h));
        c.lineTo(posX * w/wc, _y(h, h));
        c.stroke();

        // real y
        c.strokeStyle = 'rgba(0,255,0,0.15)';
        c.beginPath();
        c.moveTo(0, _y(posY * h/hc, h));
        c.lineTo(w, _y(posY * h/hc, h));
        c.stroke();

        // final point
        c.fillStyle = '#00FF00';
        c.beginPath();
        c.arc(posX * w/wc, _y(posY * h/hc, h), 5, 0, 2 * Math.PI);
        c.fill();

        c.strokeStyle = oldStroke;
        c.fillStyle = oldFill;
        c.lineWidth = oldLineWidth;
    }

    return new Coordinate(posX * w/wc, _y(posY * h/hc, h));
}
