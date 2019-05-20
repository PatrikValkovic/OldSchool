
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context: CanvasRenderingContext2D = canvas.getContext('2d');

const screenSize = new Rect(canvas.height, canvas.width);
const wordSize = new Rect(60, 80);
const centerPos = new Coordinate(40, 30);
const eye = 10;
const depth = 50;

function generate(width, height, depth){
    const lines = [];
    for(let i = 0; i <= width; i++){
        lines.push(
            [
                new Coordinate3D(i, 0, 0),
                new Coordinate3D(i, depth, 0)
            ],
            [
                new Coordinate3D(i, 0, height),
                new Coordinate3D(i, depth, height)
            ]
        )
    }
    for(let i = 0; i <= height; i++){
        lines.push(
            [
                new Coordinate3D(0, 0, i),
                new Coordinate3D(0, depth, i)
            ],
            [
                new Coordinate3D(width, 0, i),
                new Coordinate3D(width, depth, i)
            ]
        )
    }
    for(let i = 0; i <= depth; i++){
        lines.push(
            [
                new Coordinate3D(0, i, 0),
                new Coordinate3D(width, i, 0)
            ],
            [
                new Coordinate3D(width, i, 0),
                new Coordinate3D(width, i, height)
            ],
            [
                new Coordinate3D(width, i, height),
                new Coordinate3D(0, i, height)
            ],
            [
                new Coordinate3D(0, i, height),
                new Coordinate3D(0, i, 0)
            ]
        )
    }
    return lines;
}

function createCube(where: Coordinate3D){
    const {x, y, z} = where;
    const leftTopFront = new Coordinate3D(x, y, z+1);
    const rightTopFront = new Coordinate3D(x+1, y, z+1);
    const leftBottomFront = new Coordinate3D(x, y, z);
    const rightBottomFront = new Coordinate3D(x+1, y, z);
    const leftTopBack = new Coordinate3D(x, y+1, z+1);
    const rightTopBack = new Coordinate3D(x+1, y+1, z+1);
    const leftBottomBack = new Coordinate3D(x, y+1, z);
    const rightBottomBack = new Coordinate3D(x+1, y+1, z);

    return [
        [leftTopFront, rightTopFront],
        [leftTopFront, leftBottomFront],
        [leftTopFront, leftTopBack],
        [leftBottomFront, rightBottomFront],
        [leftBottomFront, leftBottomBack],
        [rightTopFront, rightBottomFront],
        [rightTopFront, rightTopBack],
        [rightBottomFront, rightBottomBack],
        [leftTopBack, rightTopBack],
        [leftTopBack, leftBottomBack],
        [leftBottomBack, rightBottomBack],
        [rightTopBack, rightBottomBack]
    ];
}

function draw(lines, context: CanvasRenderingContext2D){
    for(const line of lines) {
        const fir = positionCalculation(line[0], centerPos, wordSize, screenSize, eye, null);
        const sec = positionCalculation(line[1], centerPos, wordSize, screenSize, eye, null);
        context.beginPath();
        context.moveTo(fir.x, fir.y);
        context.lineTo(sec.x, sec.y);
        context.stroke();
    }
}

/*
for(const p of [
    new Coordinate3D(0, 1, 1),
    new Coordinate3D(1, 2, 1),
    new Coordinate3D(2, 3, 1),
    new Coordinate3D(3, 10, 1),
    new Coordinate3D(4, 12, 1),
    new Coordinate3D(5, 14, 1),
    new Coordinate3D(6, 16, 1),
]){
    const draw = positionCalculation(p, centerPos, wordSize, screenSize, 2, context);
    context.beginPath();
    context.fillStyle = '#FF0000';
    context.arc(draw.x, draw.y, 4, 0, 2 * Math.PI);
    context.fill();
}
*/


/*
context.strokeStyle = '#000000';
context.lineWidth = 1;
draw(generate(wordSize.w, wordSize.h, 500), context);
context.strokeStyle = '#0000FF';
context.lineWidth = 1;
draw([
    ...createCube(new Coordinate3D(3, 6, 0)),
    ...createCube(new Coordinate3D(3, 6, 1)),
    ...createCube(new Coordinate3D(3, 6, 2)),
    ...createCube(new Coordinate3D(3, 6, 3)),
    ...createCube(new Coordinate3D(3, 6, 4)),
    ...createCube(new Coordinate3D(3, 6, 5)),
    ...createCube(new Coordinate3D(3, 6, 6)),
    ...createCube(new Coordinate3D(3, 6, 7)),
    ...createCube(new Coordinate3D(3, 6, 8)),
    ...createCube(new Coordinate3D(3, 6, 9)),
], context);
*/

const actual = performance.now();
context.strokeStyle = '#000000';
context.lineWidth = 1;
draw(generate(wordSize.w, wordSize.h, depth), context);
console.log(performance.now() - actual);
