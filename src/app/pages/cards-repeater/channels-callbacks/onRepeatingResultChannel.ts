import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onRepeatingResultChannel: ICallback<CardRepeaterCallbackSettings, ICardsGroup[]> = (
    {services: {cardsRepeaterService}, location}
) => {
    cardsRepeaterService.cardChannel.next(location.state.cardsIDsForRepeating);
}