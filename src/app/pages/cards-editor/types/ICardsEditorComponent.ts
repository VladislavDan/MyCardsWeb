import {ISimplifiedCardsGroup} from "../../../common/types/ISimplifiedCardsGroup";

export interface ICardsEditorComponent {
    answer: string;
    question: string;
    onChangeAnswer: (answer: string) => void;
    onChangeQuestion: (question: string) => void;
    onSaveCard: () => void;
    currentCardsGroup: ISimplifiedCardsGroup;
    cardsGroups: ISimplifiedCardsGroup[];
    onChangeCardsGroup: (cardsGroupID: number) => void;
}