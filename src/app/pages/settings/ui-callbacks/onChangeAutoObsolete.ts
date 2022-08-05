import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeAutoObsolete: ICallback<SettingsCallbackSettings, boolean> = (
    {setState, services: {settingsService}},
    isEnable = false
) => {
    setState((prevState) => {
        settingsService.changeSettingsChannel.next({
            ...prevState,
            autoObsolete: {
                ...prevState.autoObsolete,
                isEnable
            }
        })
        return prevState;
    })
}