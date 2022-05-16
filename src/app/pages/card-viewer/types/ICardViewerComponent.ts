import {ICard} from "../../../common/types/ICard";

export interface ICardViewerComponent {
    card: ICard | undefined;
    onClick: (isUnderstandable: boolean) => void;
    isQuestionSide: boolean;
    onClickCard: () => void;
    cardHeight: number;
    onBackClick: () => void;
    onSwitchEditing: () => void;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
    onChangeAnswer: (answer: string) => void;
}