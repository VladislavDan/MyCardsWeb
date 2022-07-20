import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onClickCard: ICallback<CardRepeaterCallbackSettings, void> = (
    {setState, state}
) => {
    if (!state.isEditable) {
        setState((prevState) => {
            return {
                ...prevState,
                isQuestionSide: !prevState.isQuestionSide
            }
        })
    }
}