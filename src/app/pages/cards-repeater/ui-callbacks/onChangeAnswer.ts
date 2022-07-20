import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onChangeAnswer: ICallback<CardRepeaterCallbackSettings, string> = (
    {setState, state},
    answer = ''
) => {
    if (state.card) {
        const editableCard = {
            ...state.card,
            answer
        };

        setState((prevState) => {
            return {...prevState, card: editableCard}
        });
    }
}