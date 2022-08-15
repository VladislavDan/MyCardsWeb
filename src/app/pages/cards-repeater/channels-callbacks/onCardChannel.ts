import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCardValue} from "../../../common/defaults/defaultCardValue";

export const onCardChannel: ICallback<CardRepeaterCallbackSettings, ICard> = (
    {services: {cardsRepeaterService}, setState},
    card = defaultCardValue
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
    cardsRepeaterService.repeatingProgressChannel.next('');
}