import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {initDefaultCard} from "../../../common/logic/initDefaultCard";

export const onSwitchEditing: ICallback<CardRepeaterCallbackSettings, void> = (
    {setState, location, state, services: {cardsEditorService}}
) => {
    setState((prevState) => {
        return {
            ...prevState,
            isEditable: !prevState.isEditable
        }
    });

    if (state.isEditable) {
        cardsEditorService.cardEditingChannel.next({
            card: state.card || initDefaultCard(),
            cardsGroupID: location.state.cardsGroupID
        })
    }
}