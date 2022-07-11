import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onChangeAnswer: ICallback<CardViewerCallbackSettings, string> = (
    {state, setState},
    args = ''
) => {
    if (state.card) {
        const editableCard = {
            ...state.card,
            answer: args
        };

        setState((prevState) => {
            return {...prevState, card: editableCard}
        });
    }
}