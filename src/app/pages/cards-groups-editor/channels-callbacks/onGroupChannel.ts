import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {defaultCardsGroupValue} from "../../../common/defaults/defaultCardsGroupValue";

export const onGroupChannel: ICallback<ICardsGroupsEditorCallbackSettings, ICardsGroup> = (
    {setState},
    cardsGroup = defaultCardsGroupValue
) => {
    setState((prevState) => {
        return {
            cardsGroup
        }
    })
}