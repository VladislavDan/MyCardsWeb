import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {defaultCardsGroup} from "../../../common/defaults/defaultCardsGroup";

export const onGroupChannel: ICallback<ICardsGroupsEditorCallbackSettings, ICardsGroup> = (
    {setState},
    cardsGroup = defaultCardsGroup
) => {
    setState((prevState) => {
        return {
            cardsGroup
        }
    })
}