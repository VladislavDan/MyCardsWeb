import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";

export const onSaveGroup: ICallback<ICardsGroupsEditorCallbackSettings, void> = (
    {setState, services}
) => {
    setState((prevState) => {
        services.cardsGroupsEditorService.groupEditingChannel.next(prevState.cardsGroup);
        return prevState;
    })
}