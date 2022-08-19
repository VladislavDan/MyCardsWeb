import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onSaveRepeater: ICallback<RepeaterEditorCallbackSettings, ICardsGroup[]> = (
    {setState, services: {repeaterEditorService}}
) => {
    setState((prevState) => {
        repeaterEditorService.saveRepeaterChannel.next(prevState.repeater);
        return prevState;
    })
}