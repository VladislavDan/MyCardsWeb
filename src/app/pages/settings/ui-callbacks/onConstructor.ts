import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<SettingsCallbackSettings, void> = (
    {setState, services: {settingsService}}
) => {
    settingsService.settingsChannel.next(empty);
}