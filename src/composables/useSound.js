export function useSound() {
    const playSound = (soundName, startTime = 0, playbackRate = 1) => {
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        audio.playbackRate = playbackRate;
        
        if (startTime > 0) {
            audio.addEventListener('loadedmetadata', () => {
                audio.currentTime = startTime;
            });
        }
        
        audio.play().catch(e => console.error("Error playing sound:", e));
    };

    const playSuccess = () => playSound('success-ding');
    const playFart = () => playSound('fart-sound', 0.5);
    const playWin = () => playSound('win-game');
    const playTie = () => playSound('tie-game', 0, 2);

    return {
        playSuccess,
        playFart,
        playWin,
        playTie,
        playSound
    };
}
