import * as React from 'react';
import {FC, useState} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {SettingsComponent} from './SettingsComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {ISettings} from '../../common/types/ISettings';
import {ISettingsContainer} from "./types/ISettingsContainer";

export const SettingsContainer: FC<ISettingsContainer> = ({settingsService}) => {

    const [state, setState] = useState<ISettings>({
        isRandomRepeating: false,
        autoObsolete: {
            isEnable: false,
            timeInDone: 7,
            timeInProgress: 7
        }
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
    const onChangeAlgorithm = (isRandomRepeating: boolean) => {
        settingsService.changeSettingsChannel.next({
            ...state,
            isRandomRepeating
        })
    }

    const onChangeAutoObsolete = (isEnable: boolean) => {
        settingsService.changeSettingsChannel.next({
            ...state,
            autoObsolete: {
                ...state.autoObsolete,
                isEnable
            }
        })
    }

    const onChangeTimeInDone = (timeInDone: number) => {
        settingsService.changeSettingsChannel.next({
            ...state,
            autoObsolete: {
                ...state.autoObsolete,
                timeInDone
            }
        })
    }

    const onChangeTimeInProgress = (timeInProgress: number) => {
        settingsService.changeSettingsChannel.next({
            ...state,
            autoObsolete: {
                ...state.autoObsolete,
                timeInProgress
            }
        })
    }

    return <SettingsComponent
        settings={state}
        onChangeAlgorithm={onChangeAlgorithm}
        onChangeAutoObsolete={onChangeAutoObsolete}
        onChangeTimeInDone={onChangeTimeInDone}
        onChangeTimeInProgress={onChangeTimeInProgress}
    />
};
