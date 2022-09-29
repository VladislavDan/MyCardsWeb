import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onChangeQuestion: ICallback<CardRepeaterCallbackSettings, string> = (
    {setState},
    question = ''
) => {
    setState((prevState) => {
        if (prevState.card) {
            const editableCard = {
                ...prevState.card,
                question
            };
            return {...prevState, card: editableCard}
        }
        return prevState
    });
}