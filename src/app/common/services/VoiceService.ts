export class VoiceService {

    private voices: SpeechSynthesisVoice[] = [];

    constructor() {
        speechSynthesis.addEventListener("voiceschanged", () => {
            this.voices = speechSynthesis.getVoices().filter((voice) => {
                return voice.lang === 'en-US';
            });
        })
    }

    public getRandomVoice(): SpeechSynthesisVoice {
        return this.voices[Math.floor(Math.random() * this.voices.length)]
    }
}