import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";
import {ISettings} from "../../../common/types/ISettings";

export const onChangeSettingsChannel: ICallback<SettingsCallbackSettings, ISettings> = (
    {services: {settingsService}}
) => {
    settingsService.settingsChannel.next('');
}