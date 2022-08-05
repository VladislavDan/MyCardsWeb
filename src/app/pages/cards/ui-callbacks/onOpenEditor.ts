import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onOpenEditor: ICallback<CardsCallbackSettings, void> = (
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