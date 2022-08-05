import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onChangeAlgorithm: ICallback<SettingsCallbackSettings, boolean> = (
    {setState, services: {settingsService}},
    isRandomRepeating = false
) => {
    setState((prevState) => {
        settingsService.changeSettingsChannel.next({
            ...prevState,
            isRandomRepeating
        })
        return prevState;
    })
}