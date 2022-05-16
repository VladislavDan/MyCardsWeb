import {IStatistic} from "../../../common/types/IStatistic";
import {ICardsContentComponent} from "../../../common/elements/cards-content/types/ICardsContentComponent";

export interface ICardsRepeaterComponent extends ICardsContentComponent {
    statistic: IStatistic;
    onBackClick: () => void;
}