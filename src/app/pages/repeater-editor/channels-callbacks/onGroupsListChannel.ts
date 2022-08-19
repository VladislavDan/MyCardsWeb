import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onGroupsListChannel: ICallback<RepeaterEditorCallbackSettings, ICardsGroup[]> = (
    {setState},
    cardsGroups = []
) => {
    setState((prevState) => {
        return {
            ...prevState,
            cardsGroups
        }
    })
}