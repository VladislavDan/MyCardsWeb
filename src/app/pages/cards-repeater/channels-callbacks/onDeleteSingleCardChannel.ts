import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onDeleteSingleCardChannel: ICallback<CardRepeaterCallbackSettings, ICardsGroup[]> = (
    {services, location}
) => {
    services.cardsRepeaterService.cardChannel.next(
        location.state ? location.state.cardsIDsForRepeating : []
    )
}