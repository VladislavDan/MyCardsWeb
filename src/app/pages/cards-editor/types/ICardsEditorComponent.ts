export interface ICardsEditorComponent {
    answer: string;
    question: string;
    onChangeAnswer: (answer: string) => void;
    onChangeQuestion: (question: string) => void;
    onSaveCard: () => void;
}