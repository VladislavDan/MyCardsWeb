import {ICard} from "../../../common/types/ICard";
import {IStatistic} from "../../../common/types/IStatistic";

export interface CardRepeaterContainerState {
    card: ICard,
    isQuestionSide: boolean,
    isEditable: boolean,
    statistic: IStatistic
}