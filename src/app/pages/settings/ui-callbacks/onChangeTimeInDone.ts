import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeTimeInDone: ICallback<SettingsCallbackSettings, number> = (
    {state, services: {settingsService}},
    timeInDone = -1
) => {
    settingsService.changeSettingsChannel.next({
        ...state,
        autoObsolete: {
            ...state.autoObsolete,
            timeInDone
        }
    })
}