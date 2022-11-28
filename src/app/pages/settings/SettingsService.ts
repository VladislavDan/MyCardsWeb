import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {ISettings} from '../../common/types/ISettings';
import {IEmpty} from '../../../MyTools/channel-conception/defaults/IEmpty';

export class SettingsService {

    public settingsChannel: Channel<IEmpty, ISettings>;

    public changeSettingsChannel: Channel<ISettings, ISettings>;

    constructor(storageService: getStorageService) {

        this.settingsChannel = new Channel(() => storageService.getSettings());

        this.changeSettingsChannel = new Channel(
            (settings: ISettings) => storageService.setSettings(settings)
        );
    }
}
