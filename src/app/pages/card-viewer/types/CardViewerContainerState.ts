import {ICard} from "../../../common/types/ICard";

export interface CardViewerContainerState {
    card: ICard,
    isQuestionSide: boolean,
    isEditable: boolean,
}