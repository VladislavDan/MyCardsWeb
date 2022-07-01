export interface ITextEditorComponent {
    onChangeText: (answer: string) => void;
    changeableText: string
    label?: string
}