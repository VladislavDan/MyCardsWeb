import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onChangeAnswer: ICallback<CardRepeaterCallbackSettings, string> = (
    {setState},
    answer = ''
) => {
    setState((prevState) => {
        if (prevState.card) {
            const editableCard = {
                ...prevState.card,
                answer
            };
            return {...prevState, card: editableCard}
        }
        return prevState;
    });
}