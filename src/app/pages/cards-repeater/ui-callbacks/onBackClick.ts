import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onBackClick: ICallback<CardRepeaterCallbackSettings, void> = (
    {history}
) => {
    history.goBack();
}