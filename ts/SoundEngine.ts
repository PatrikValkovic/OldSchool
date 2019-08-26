import {settings} from "./Settings";

export class SoundWrapper {
    constructor(public gain: GainNode,
                public buffer: AudioBufferSourceNode){
    }
}

class SoundEngine {
    private context: AudioContext;
    private looping: SoundWrapper[] = [];

    private backgroundBuffers: AudioBuffer[] = [];

    constructor(){
        this.context = new AudioContext();
        settings().backgroundMusic.forEach(file => {
            this.prepare(file).then(buffer => this.backgroundBuffers.push(buffer));
        })
    }

    async prepare(filepath): Promise<AudioBuffer> {
        const request = new XMLHttpRequest();
        request.open('GET', filepath, true);
        request.responseType = 'arraybuffer';
        const result = new Promise<AudioBuffer>((resolve, reject) => {
            // Decode asynchronously
            request.onload = () => {
                this.context.decodeAudioData(request.response, resolve, reject);
            };
        });
        request.send();
        return result;
    }

    playBackground(){
        const i = Math.floor(Math.random() * this.backgroundBuffers.length);
        const wrapper = this.playInLoop(this.backgroundBuffers[i]);
        wrapper.buffer.loop = false;
        wrapper.buffer.addEventListener("ended", () => this.playBackground());
    }

    playInLoop(buffer: AudioBuffer, replacePrev = true): SoundWrapper {
        if(replacePrev){
            for(const source of this.looping)
                source.gain.disconnect();
            this.looping = [];
        }

        const wrapper = this.playNow(buffer);
        wrapper.buffer.loop = true;
        this.looping.push(wrapper);
        return wrapper;
    }

    playNow(buffer: AudioBuffer): SoundWrapper {
        const gain = this.context.createGain();
        gain.gain.value = 1;
        gain.connect(this.context.destination);

        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);
        source.start(0);

        return new SoundWrapper(gain, source);
    }

    getLooping(): SoundWrapper[] {
        return [...this.looping];
    }

    resume(){
        this.context.resume();
    }
}


const soundEngine = new SoundEngine();

export function sound() {
    return soundEngine;
}
