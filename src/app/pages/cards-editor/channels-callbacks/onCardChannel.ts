import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {defaultCard} from "../../../common/defaults/defaultCard";

export const onCardChannel: ICallback<CardsEditorCallbackSettings, ICard> = (
    {history, setState},
    card = defaultCard
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