import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {ICard} from "../../../common/types/ICard";

export const onCardsChannel: ICallback<CardsContainerCallbackSettings, ICard[]> = (
    {state, setState},
    cards = []
) => {
    setState((prevState) => {
        return {
            ...prevState,
            cards
        }
    })
}