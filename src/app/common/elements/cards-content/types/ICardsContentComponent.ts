import {ICard} from "../../../types/ICard";

export interface ICardsContentComponent {
    card: ICard | undefined;
    onClick: (isUnderstandable: boolean) => void;
    isQuestionSide: boolean;
    onClickCard: () => void;
    cardHeight: number;
    onSwitchEditing: () => void;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
    onChangeAnswer: (answer: string) => void;
}