import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCardValue} from "../../../common/defaults/defaultCardValue";

export const onCardEditingChannel: ICallback<CardRepeaterCallbackSettings, ICard> = (
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