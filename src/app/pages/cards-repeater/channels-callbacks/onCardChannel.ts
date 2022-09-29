import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCard} from "../../../common/defaults/defaultCard";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onCardChannel: ICallback<CardRepeaterCallbackSettings, ICard> = (
    {services: {cardsRepeaterService}, setState},
    card = defaultCard
) => {
    cardsRepeaterService.cardGroupNameChannel.next(card.id)
    setState((prevState) => {
        return {
            ...prevState,
            card: card,
            isQuestionSide: true,
            isEditable: false
        }
    });
    cardsRepeaterService.repeatingProgressChannel.next(empty);
}