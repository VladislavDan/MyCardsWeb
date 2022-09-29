import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";
import {ISettings} from "../../../common/types/ISettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onChangeSettingsChannel: ICallback<SettingsCallbackSettings, ISettings> = (
    {services: {settingsService}}
) => {
    settingsService.settingsChannel.next(empty);
}