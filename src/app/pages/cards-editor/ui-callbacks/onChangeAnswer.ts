import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onChangeAnswer: ICallback<CardsEditorCallbackSettings, string> = (
    {history, setState, state},
    answer = ''
) => {
    setState((prevState) => {
        return {
            card: {
                ...prevState.card,
                answer
            }
        }
    })
}