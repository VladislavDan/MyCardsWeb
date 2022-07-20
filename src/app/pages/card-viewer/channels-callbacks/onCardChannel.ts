import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCardValue} from "../../../common/defaults/defaultCardValue";

export const onCardChannel: ICallback<CardViewerCallbackSettings, ICard> = (
    {services, setState},
    card = defaultCardValue
) => {
    services.cardViewerService.cardGroupNameChannel.next(card.id)
    setState((prevState) => {
        return {
            ...prevState,
            card: card
        }
    });
}