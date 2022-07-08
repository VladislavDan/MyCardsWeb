import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../../cards-editor/types/CardsEditorCallbackSettings";

export const onChangeAnswer: ICallback<CardsEditorCallbackSettings, string> = (
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