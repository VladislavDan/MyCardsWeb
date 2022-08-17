import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCard} from "../../../common/defaults/defaultCard";

export const onCardEditingChannel: ICallback<CardRepeaterCallbackSettings, ICard> = (
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