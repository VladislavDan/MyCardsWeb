import {ICard} from "../../../common/types/ICard";
import {IRepeatingProgress} from "../../../common/types/IRepeatingProgress";

export interface CardRepeaterContainerState {
    card: ICard,
    isQuestionSide: boolean,
    isEditable: boolean,
    repeatingProgress: IRepeatingProgress
}