import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";

export const onConstructor: ICallback<ICardsGroupsEditorCallbackSettings, void> = (
    {services, location}
) => {
    let cardsGroupID = location.state ? location.state.cardsGroupID : -1;
    services.cardsGroupsEditorService.groupChannel.next(cardsGroupID)
}