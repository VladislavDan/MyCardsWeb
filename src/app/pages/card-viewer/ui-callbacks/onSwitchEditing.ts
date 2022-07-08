import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {initDefaultCard} from "../../../common/logic/initDefaultCard";

export const onSwitchEditing: ICallback<CardViewerCallbackSettings, void> = (
    {
        state,
        setState,
        services,
        location
    }
) => {
    setState(() => {
        return {
            ...state,
            isEditable: !state.isEditable
        }
    });

    if (state.isEditable) {
        services.cardsEditorService.cardEditingChannel.next({
            card: state.card || initDefaultCard(),
            cardsGroupID: location.state.cardsGroupID
        })
    }
}