import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCard} from "../../../common/defaults/defaultCard";

export const onCardEditingChannel: ICallback<CardViewerCallbackSettings, ICard> = (
    {setState},
    card = defaultCard
) => {
    setState((prevState) => {
        return {
            ...prevState,
            card: card
        }
    });
}