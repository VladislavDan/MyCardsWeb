import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onChangeQuestion: ICallback<CardRepeaterCallbackSettings, string> = (
    {setState, state},
    question = ''
) => {
    if (state.card) {
        const editableCard = {
            ...state.card,
            question
        };

        setState((prevState) => {
            return {...prevState, card: editableCard}
        });
    }
}