import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onClickCard: ICallback<CardRepeaterCallbackSettings, void> = (
    {setState}
) => {

    setState((prevState) => {
        if (!prevState.isEditable) {
            return {
                ...prevState,
                isQuestionSide: !prevState.isQuestionSide
            }
        }
        return prevState;
    })
}