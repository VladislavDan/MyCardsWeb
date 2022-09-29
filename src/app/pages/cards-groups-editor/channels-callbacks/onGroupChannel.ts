import {ICallback} from "../../../../MyTools/react-types/ICallback";
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