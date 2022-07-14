import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onConstructor: ICallback<CardsEditorCallbackSettings, void> = (
    {
        location,
        services
    }
) => {
    let cardsGroupID = location.state ? location.state.cardsGroupID : -1;
    let cardID = location.state ? location.state.cardID : -1;
    services.cardsEditorService.cardChannel.next({cardID, cardsGroupID});
}