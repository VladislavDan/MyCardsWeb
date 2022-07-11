import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {defaultCardsGroupValue} from "../../../common/Constants";

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