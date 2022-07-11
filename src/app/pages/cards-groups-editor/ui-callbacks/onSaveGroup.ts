import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";

export const onSaveGroup: ICallback<ICardsGroupsEditorCallbackSettings, void> = (
    {state, services}
) => {
    services.cardsGroupsEditorService.groupEditingChannel.next(state.cardsGroup);
}