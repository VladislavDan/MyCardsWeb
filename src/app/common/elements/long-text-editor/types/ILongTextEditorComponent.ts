export interface ILongTextEditorComponent {
    viewHeight: number;
    onChangeText: (text: string) => void;
    text: string;
}