import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeTimeInProgress: ICallback<SettingsCallbackSettings, number> = (
    {setState, services: {settingsService}},
    timeInProgress = -1
) => {
    setState((prevState) => {
        settingsService.changeSettingsChannel.next({
            ...prevState,
            autoObsolete: {
                ...prevState.autoObsolete,
                timeInProgress
            }
        })
        return prevState;
    })
}