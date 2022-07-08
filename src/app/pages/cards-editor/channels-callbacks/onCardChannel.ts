import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCardValue} from "../../../common/Constants";

export const onCardChannel: ICallback<CardsEditorCallbackSettings, ICard> = (
    {history, setState, state},
    card = defaultCardValue
) => {
    if (card) {
        setState(() => {
            return {
                ...state,
                card
            }
        })
    }
}