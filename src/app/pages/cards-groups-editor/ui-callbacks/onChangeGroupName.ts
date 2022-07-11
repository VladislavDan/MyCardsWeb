import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";

export const onChangeGroupName: ICallback<ICardsGroupsEditorCallbackSettings, string> = (
    {setState, state},
    groupName = ''
) => {
    setState(() => {
        return {
            cardsGroup: {
                ...state.cardsGroup,
                nameCardsGroup: groupName
            }
        }
    })
}