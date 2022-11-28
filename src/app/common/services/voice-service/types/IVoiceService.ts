import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export interface IVoiceService extends IDependency {
    getRandomVoice: () => SpeechSynthesisVoice;
}