import {IRepeatingProgress} from "../../../common/types/IRepeatingProgress";
import {ICardsContentComponent} from "../../../common/elements/cards-content/types/ICardsContentComponent";

export interface ICardsRepeaterComponent extends ICardsContentComponent {
    repeatingProgress: IRepeatingProgress;
    onBackClick: () => void;
    onDeleteCard: () => void;
}