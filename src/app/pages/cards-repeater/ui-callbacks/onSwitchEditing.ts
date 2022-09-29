import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {initDefaultCard} from "../../../common/logic/initDefaultCard";

export const onSwitchEditing: ICallback<CardRepeaterCallbackSettings, void> = (
    {setState, location, services: {cardsEditorService}}
) => {
    setState((prevState) => {
        if (prevState.isEditable) {
            cardsEditorService.cardEditingChannel.next({
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