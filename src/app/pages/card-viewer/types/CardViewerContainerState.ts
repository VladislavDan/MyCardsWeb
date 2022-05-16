import {ICard} from "../../../common/types/ICard";

export interface CardViewerContainerState {
    card: ICard | undefined,
    isQuestionSide: boolean,
    isEditable: boolean,
}