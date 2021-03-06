import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {CardsContainerState} from "../types/CardsContainerState";

export const onCardsChannel: ICallback<CardsContainerCallbackSettings, ICard[]> = (
    {state, setState},
    cards = []
) => {
    setState((prevState: CardsContainerState) => {
        return {
            ...prevState,
            cards
        }
    })
}