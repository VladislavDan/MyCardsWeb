import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onChangeQuestion: ICallback<CardViewerCallbackSettings, string> = (
    {state, setState},
    args = ''
) => {
    if (state.card) {
        const editableCard = {
            ...state.card,
            question: args
        };

        setState((prevState) => {
            return {...prevState, card: editableCard}
        });
    }
}