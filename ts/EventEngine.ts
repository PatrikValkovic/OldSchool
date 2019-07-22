import {settings} from "./Settings";

export interface EventState {
    verticalMovement: number;
    horizontalMovement: number;
    paused: boolean,
}

const defaultEventState: EventState = {
    verticalMovement: 0,
    horizontalMovement: 0,
    paused: false,
};

export class PauseException {

}

export class EventEngine {

    private readonly currentSetting = settings();

    private pressedKeys = {
        up: false,
        down: false,
        left: false,
        right: false,
    };
    private currentFrameEvents: EventState = {...defaultEventState};
    private processingEvents: EventState;

    public attach(canvas: HTMLCanvasElement): void {
        window.addEventListener('keydown', (ev) => {
            switch(ev.code){
                case 'KeyW':
                case 'ArrowUp':
                    this.pressedKeys.up = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.pressedKeys.down = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.pressedKeys.left = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.pressedKeys.right = true;
                    break;
            }
        });
        window.addEventListener('keyup', (ev) => {
            switch(ev.code){
                case 'KeyW':
                case 'ArrowUp':
                    this.pressedKeys.up = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.pressedKeys.down = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.pressedKeys.left = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.pressedKeys.right = false;
                    break;
            }
        });
        window.addEventListener('keypress', (ev) => {
            switch (ev.code) {
                case 'KeyP':
                    this.currentFrameEvents.paused = !this.processingEvents.paused;
                    break;
            }
        });
        //TODO maybe remove
        canvas.requestPointerLock();
        window.addEventListener('mouseup', () => {
            canvas.requestPointerLock();
        });
        window.addEventListener('mousemove', (ev) => {
            this.currentFrameEvents.verticalMovement -= ev.movementY * this.currentSetting.mouseSensetivity;
            this.currentFrameEvents.horizontalMovement += ev.movementX * this.currentSetting.mouseSensetivity;
        });
        document.addEventListener('pointerlockchange', (ev) => {
            console.log('lock changed', ev)
            /* TODO handle somehow */
        });
        document.addEventListener('pointerlockerror', (ev) => {
            console.log('lock error', ev)
            /* TODO handle somehow */
        })
    }

    public nextFrame(): void {
        this.processingEvents = {...this.currentFrameEvents};
        this.currentFrameEvents = {...defaultEventState};
        this.currentFrameEvents.paused = this.processingEvents.paused;

        if(this.pressedKeys.up)
            this.processingEvents.verticalMovement += this.currentSetting.keyboardSensitivity;
        if(this.pressedKeys.down)
            this.processingEvents.verticalMovement -= this.currentSetting.keyboardSensitivity;
        if(this.pressedKeys.left)
            this.processingEvents.horizontalMovement -= this.currentSetting.keyboardSensitivity;
        if(this.pressedKeys.right)
            this.processingEvents.horizontalMovement += this.currentSetting.keyboardSensitivity;

        this.processingEvents = Object.freeze(this.processingEvents);
    }

    public checkPause(): void {
        if(this.getState().paused){
            throw new PauseException();
        }
    }

    public getState(): EventState{
        return this.processingEvents;
    }
}
