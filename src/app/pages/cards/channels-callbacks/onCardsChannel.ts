import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {ICard} from "../../../common/types/ICard";
import {CardsContainerState} from "../types/CardsContainerState";

export const onCardsChannel: ICallback<CardsCallbackSettings, ICard[]> = (
    {setState},
    cards = []
) => {
    setState((prevState: CardsContainerState) => {
        return {
            ...prevState,
            cards
        }
    })
}