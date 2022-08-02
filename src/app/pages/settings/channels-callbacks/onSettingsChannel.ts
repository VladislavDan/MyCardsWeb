import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";
import {ISettings} from "../../../common/types/ISettings";
import {defaultSettings} from "../../../common/defaults/defaultSettings";

export const onSettingsChannel: ICallback<SettingsCallbackSettings, ISettings> = (
    {setState, services: {settingsService}},
    settings = defaultSettings
) => {
    setState((prevState) => {
        return {...prevState, ...settings}
    });
}