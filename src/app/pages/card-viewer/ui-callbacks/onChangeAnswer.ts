import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onChangeAnswer: ICallback<CardViewerCallbackSettings, string> = (
    {setState},
    args = ''
) => {
    setState((prevState) => {
        if (prevState.card) {
            const editableCard = {
                ...prevState.card,
                answer: args
            };
            return {...prevState, card: editableCard}
        }
        return prevState;
    });
}