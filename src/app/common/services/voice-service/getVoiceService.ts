import {IDependencyFunction} from 'src/MyTools/react-di/types/IDependencyFunction';
import {IVoiceService} from 'src/app/common/services/voice-service/types/IVoiceService';

export const getVoiceService: IDependencyFunction<IVoiceService, any> = () => {

    let voices: SpeechSynthesisVoice[] = [];

    speechSynthesis.addEventListener('voiceschanged', () => {
        voices = speechSynthesis.getVoices().filter((voice) => {
            return voice.lang === 'en-US';
        });
    })

    const getRandomVoice = (): SpeechSynthesisVoice => {
        return voices[Math.floor(Math.random() * voices.length)]
    }

    return {
        getRandomVoice
    }
}