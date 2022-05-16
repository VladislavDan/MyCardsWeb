import {StorageService} from '../../common/services/StorageService';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {ISettings} from '../../common/types/ISettings';

export class SettingsService {

    public settingsChannel: Channel<string, ISettings>;

    public changeSettingsChannel: Channel<ISettings, ISettings>;

    constructor(storageService: StorageService) {

        this.settingsChannel = new Channel(() => storageService.getSettings());

        this.changeSettingsChannel = new Channel(
            (settings: ISettings) => storageService.setSettings(settings)
        );
    }
}
