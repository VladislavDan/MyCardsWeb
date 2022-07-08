import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onClickCard: ICallback<CardViewerCallbackSettings, void> = (
    {
        state,
        setState
    }
) => {
    if (!state.isEditable) {
        setState(() => {
            return {
                ...state,
                isQuestionSide: !state.isQuestionSide
            }
        })
    }
}