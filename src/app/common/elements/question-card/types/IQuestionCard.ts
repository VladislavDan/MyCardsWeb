import {ICard} from "../../../types/ICard";

export interface IQuestionCard {
    card: ICard | undefined;
    onClickCard: () => void;
    onDeleteCard: () => void;
    cardHeight: number;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
}