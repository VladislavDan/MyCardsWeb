import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeAutoObsolete: ICallback<SettingsCallbackSettings, boolean> = (
    {state, services: {settingsService}},
    isEnable = false
) => {
    settingsService.changeSettingsChannel.next({
        ...state,
        autoObsolete: {
            ...state.autoObsolete,
            isEnable
        }
    })
}