import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {ICard} from "../../../common/types/ICard";

export const onConstructor: ICallback<CardRepeaterCallbackSettings, ICard> = (
    {services: {cardsRepeaterService}, location}
) => {
    if (location.state) {
        cardsRepeaterService.cardChannel.next(location.state.cardsIDsForRepeating);
    }
    cardsRepeaterService.statisticChannel.next('');
}