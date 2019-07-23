export class SoundWrapper {
    constructor(public gain: GainNode,
                public buffer: AudioBufferSourceNode){
    }
}

export class SoundEngine {
    private context: AudioContext;
    private looping: SoundWrapper[] = [];

    constructor(){
        this.context = new AudioContext();
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

    playInLoop(buffer: AudioBuffer, replacePrev = true): SoundWrapper {
        if(replacePrev){
            for(const source of this.looping)
                source.gain.disconnect();
            this.looping = [];
        }

        const wrapper = this.playNow(buffer);
        wrapper.buffer.loop = true;
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
