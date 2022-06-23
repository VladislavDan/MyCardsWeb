import {Routs} from "../../../common/Routs";
import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onOpenRepeater: ICallback<CardsContainerCallbackSettings, void> = (
    {history, location}
) => {
    history.push({
        pathname: Routs.cardsRepeater.path,
        state: location.state
    })
}