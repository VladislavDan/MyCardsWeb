import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCardValue} from "../../../common/defaults/defaultCardValue";

export const onCardEditingChannel: ICallback<CardViewerCallbackSettings, ICard> = (
    {setState},
    card = defaultCardValue
) => {
    setState((prevState) => {
        return {
            ...prevState,
            card: card
        }
    });
}