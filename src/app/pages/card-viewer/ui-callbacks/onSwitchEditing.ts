import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {initDefaultCard} from "../../../common/logic/initDefaultCard";

export const onSwitchEditing: ICallback<CardViewerCallbackSettings, void> = (
    {
        setState,
        services,
        location
    }
) => {
    setState((prevState) => {
        if (prevState.isEditable) {
            services.cardsEditorService.cardEditingChannel.next({
                card: prevState.card || initDefaultCard(),
                cardsGroupID: location.state.cardsGroupID
            })
        }
        return {
            ...prevState,
            isEditable: !prevState.isEditable
        }
    });
}