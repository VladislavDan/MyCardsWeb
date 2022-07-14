import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onChangeQuestion: ICallback<CardsEditorCallbackSettings, string> = (
    {history, setState, state},
    question = ''
) => {
    setState((prevState) => {
        return {
            card: {
                ...prevState.card,
                question
            }
        }
    })
}