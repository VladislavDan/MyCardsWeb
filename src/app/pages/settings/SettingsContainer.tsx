import * as React from 'react';
import {FC, useState} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {SettingsService} from './SettingsService';
import {SettingsComponent} from './SettingsComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {ISettings} from '../../common/types/ISettings';

export const SettingsContainer: FC<ISettingsContainer> = ({settingsService}) => {

    const [state, setState] = useState<ISettings>({
        isRandomRepeating: false
    });

    useChannel<ISettings, ISettings>(
        settingsService.changeSettingsChannel,
        () => {
            settingsService.settingsChannel.next('');
        }
    );

    useChannel<string, ISettings>(
        settingsService.settingsChannel,
        (settings: ISettings) => {
            setState((prevState) => {
                return {...prevState, ...settings}
            });
        }
    );

    useConstructor(() => {
        settingsService.settingsChannel.next('');
    });

    const onChangeSettings = (settings: ISettings) => {
        settingsService.changeSettingsChannel.next(settings)
    };

    return <SettingsComponent settings={state} onChange={onChangeSettings}/>
};

interface ISettingsContainer {
    settingsService: SettingsService
}
