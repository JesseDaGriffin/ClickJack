export function useSound() {
    const playSound = (soundName, startTime = 0) => {
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        
        if (startTime > 0) {
            audio.addEventListener('loadedmetadata', () => {
                audio.currentTime = startTime;
            });
        }
        
        audio.play().catch(e => console.error("Error playing sound:", e));
    };

    const playSuccess = () => playSound('success-ding');
    const playFart = () => playSound('fart-sound', 0.5);

    return {
        playSuccess,
        playFart,
        playSound
    };
}
