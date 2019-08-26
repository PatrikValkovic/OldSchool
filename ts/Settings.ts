const defaultSettings = {
    keyboardSensitivity: 3,
    mouseSensetivity: 0.2,
    font: 'Press Start 2P',
    backgroundMusic: [
        "res/sound/Armatage Shanks - Broken Promise.mp3",
        "res/sound/Burn Halo - Dirty Little Girl (Official).mp3",
        "res/sound/Millencolin - No Cigar.mp3",
        "res/sound/NitroDive - Bad Blood.mp3",
        "res/sound/One Time A Year.mp3",
        "res/sound/Sin Shake Sin - Cant Go To Hell (Official Video).mp3",
        "res/sound/Theory of a Deadman - Bad Girlfriend [OFFICIAL VIDEO].mp3"
    ]
};

export function settings() {
    return {...defaultSettings, /* TODO custom */}
}
