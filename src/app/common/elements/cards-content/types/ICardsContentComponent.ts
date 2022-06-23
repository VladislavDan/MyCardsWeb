import {ICard} from "../../../types/ICard";

export interface ICardsContentComponent {
    card: ICard;
    onClick: (isUnderstandable: boolean) => void;
    isQuestionSide: boolean;
    onClickCard: () => void;
    cardHeight: number;
    onSwitchEditing: () => void;
    onDeleteCard: () => void;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
    onChangeAnswer: (answer: string) => void;
}