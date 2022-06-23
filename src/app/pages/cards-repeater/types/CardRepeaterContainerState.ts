import {ICard} from "../../../common/types/ICard";

export interface CardRepeaterContainerState {
    card: ICard,
    isQuestionSide: boolean,
    isEditable: boolean,
}