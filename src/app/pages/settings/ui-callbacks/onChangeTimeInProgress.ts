import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeTimeInProgress: ICallback<SettingsCallbackSettings, number> = (
    {state, services: {settingsService}},
    timeInProgress = -1
) => {
    settingsService.changeSettingsChannel.next({
        ...state,
        autoObsolete: {
            ...state.autoObsolete,
            timeInProgress
        }
    })
}