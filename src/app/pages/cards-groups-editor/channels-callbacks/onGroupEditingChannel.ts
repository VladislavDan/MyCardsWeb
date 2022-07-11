import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onGroupEditingChannel: ICallback<ICardsGroupsEditorCallbackSettings, ICardsGroup[]> = (
    {history}
) => {
    history.goBack();
}