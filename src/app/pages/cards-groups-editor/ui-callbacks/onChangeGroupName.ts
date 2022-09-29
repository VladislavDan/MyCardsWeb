import {ICallback} from "../../../../MyTools/react-types/ICallback";
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