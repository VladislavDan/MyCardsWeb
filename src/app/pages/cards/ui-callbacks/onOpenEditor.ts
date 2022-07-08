import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onOpenEditor: ICallback<CardsContainerCallbackSettings, void> = (
    {
        location,
        history
    }
) => {
    history.push({
        pathname: Routs.cardsEditor.path,
        state: {
            ...location.state,
            cardsGroupID: location.state.cardsGroupID
        }
    })
}