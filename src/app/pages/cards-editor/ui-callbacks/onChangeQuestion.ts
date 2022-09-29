import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onChangeQuestion: ICallback<CardsEditorCallbackSettings, string> = (
    {history, setState},
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