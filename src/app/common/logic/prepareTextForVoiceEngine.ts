export const prepareTextForVoiceEngine = (text: string): string => {
    text = text.replace(/_/g, '');
    text = text.replace(/=/g, '');
    text = text.replace(/\+/g, '');
    text = text.replace(/[\u0400-\u04FF]/gi, '');
    console.log(text);
    return text;
}