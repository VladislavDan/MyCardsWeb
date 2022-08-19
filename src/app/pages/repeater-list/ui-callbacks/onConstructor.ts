import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";

export const onConstructor: ICallback<RepeaterListCallbackSettings, void> = (
    {services: {repeaterListService}}
) => {
    repeaterListService
}