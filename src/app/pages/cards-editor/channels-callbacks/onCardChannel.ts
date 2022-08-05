import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCardValue} from "../../../common/defaults/defaultCardValue";

export const onCardChannel: ICallback<CardsEditorCallbackSettings, ICard> = (
    {history, setState},
    card = defaultCardValue
) => {
    if (card) {
        setState((prevState) => {
            return {
                ...prevState,
                card
            }
        })
    }
}