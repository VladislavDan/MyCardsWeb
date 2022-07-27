import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onBackClick: ICallback<CardRepeaterCallbackSettings, void> = (
    {history}
) => {
    history.goBack();
}