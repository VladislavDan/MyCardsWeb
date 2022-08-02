import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";

export const onConstructor: ICallback<SettingsCallbackSettings, void> = (
    {setState, services: {settingsService}}
) => {
    settingsService.settingsChannel.next('');
}