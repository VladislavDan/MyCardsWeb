import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onClickCard: ICallback<CardViewerCallbackSettings, void> = (
    {setState}
) => {
    setState((prevState) => {
        if (!prevState.isEditable) {
            return {
                ...prevState,
                isQuestionSide: !prevState.isQuestionSide
            }
        }
        return prevState;
    })
}