import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeAlgorithm: ICallback<SettingsCallbackSettings, boolean> = (
    {state, services: {settingsService}},
    isRandomRepeating = false
) => {
    settingsService.changeSettingsChannel.next({
        ...state,
        isRandomRepeating
    })
}