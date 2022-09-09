export const readByVoiceEngine = (text: string, voice: SpeechSynthesisVoice) => {

    const synth = window.speechSynthesis;
    const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesisUtterance.onerror = (error) => {
        console.warn('Read text error', error);
    }
    speechSynthesisUtterance.voice = voice;
    speechSynthesisUtterance.lang = 'en-US';
    speechSynthesisUtterance.rate = 1;
    synth.speak(speechSynthesisUtterance);

    return text;
}