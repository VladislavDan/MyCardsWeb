import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeTimeInDone: ICallback<SettingsCallbackSettings, number> = (
    {setState, services: {settingsService}},
    timeInDone = -1
) => {
    setState((prevState) => {
        settingsService.changeSettingsChannel.next({
            ...prevState,
            autoObsolete: {
                ...prevState.autoObsolete,
                timeInDone
            }
        })
        return prevState;
    })
}