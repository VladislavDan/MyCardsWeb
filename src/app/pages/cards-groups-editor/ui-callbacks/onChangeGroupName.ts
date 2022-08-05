import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsEditorCallbackSettings} from "../types/ICardsGroupsEditorCallbackSettings";

export const onChangeGroupName: ICallback<ICardsGroupsEditorCallbackSettings, string> = (
    {setState},
    groupName = ''
) => {
    setState((prevState) => {
        return {
            cardsGroup: {
                ...prevState.cardsGroup,
                nameCardsGroup: groupName
            }
        }
    })
}