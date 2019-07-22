export class SoundEngine {
    private context: AudioContext;
    private looping: AudioBufferSourceNode[] = [];

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

    playInLoop(buffer: AudioBuffer, replacePrev = true) {
        if(replacePrev){
            for(const source of this.looping)
                source.stop();
            this.looping = [];
        }
        const source = this.context.createBufferSource();
        this.looping.push(source);
        source.buffer = buffer;
        source.loop = true;
        source.connect(this.context.destination);
        source.start(0);
    }

    playNow(buffer: AudioBuffer){
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
        source.start(0);
    }

    resume(){
        this.context.resume();
    }
}


const soundEngine = new SoundEngine();

export function sound() {
    return soundEngine;
}
