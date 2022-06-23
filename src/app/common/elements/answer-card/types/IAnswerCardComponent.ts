import {ICard} from "../../../types/ICard";

export interface IAnswerCardComponent {
    card: ICard | undefined;
    onClickText: () => void
    cardHeight: number
    onClick: (isUnderstandable: boolean) => void;
    onDeleteCard: () => void;
    isEditable: boolean;
    onChangeAnswer: (answer: string) => void;
}