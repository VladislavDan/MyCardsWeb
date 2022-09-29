import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCard} from "../../../common/defaults/defaultCard";
import {ICallback} from "../../../../MyTools/react-types/ICallback";

export const onCardChannel: ICallback<CardViewerCallbackSettings, ICard> = (
    {services, setState},
    card = defaultCard
) => {
    services.cardViewerService.cardGroupNameChannel.next(card.id)
    setState((prevState) => {
        return {
            ...prevState,
            card: card
        }
    });
}