import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onChangeQuestion: ICallback<CardViewerCallbackSettings, string> = (
    {setState},
    args = ''
) => {
    setState((prevState) => {
        if (prevState.card) {
            const editableCard = {
                ...prevState.card,
                question: args
            };

            return {...prevState, card: editableCard}
        }
        return prevState;
    });
}