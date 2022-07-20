import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onBackClick: ICallback<CardRepeaterCallbackSettings, void> = (
    {history}
) => {
    history.replace(Routs.cardsGroups.path);
}