import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {SettingsComponent} from './SettingsComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {defaultSettings} from "../../common/defaults/defaultSettings";
import {onChangeSettingsChannel} from "./channels-callbacks/onChangeSettingsChannel";
import {onSettingsChannel} from "./channels-callbacks/onSettingsChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onChangeAlgorithm} from "./ui-callbacks/onChangeAlgorithm";
import {onChangeAutoObsolete} from "./ui-callbacks/onChangeAutoObsolete";
import {onChangeTimeInDone} from "./ui-callbacks/onChangeTimeInDone";
import {onChangeTimeInProgress} from "./ui-callbacks/onChangeTimeInProgress";
import {SettingsCallbackSettings} from "./types/SettingsCallbackSettings";
import {useDependency} from "../../../MyTools/react-di/hooks/useDependency";
import {SettingsService} from "./SettingsService";

export const SettingsContainer: FC = () => {

    const settingsService = useDependency(SettingsService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<SettingsCallbackSettings>(
        defaultSettings,
        {settingsService},
        AppContext
    );

    const {state} = externalCallbackSettings;

    useChannel(settingsService.changeSettingsChannel, callbackFactory(onChangeSettingsChannel));
    useChannel(settingsService.settingsChannel, callbackFactory(onSettingsChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeAlgorithm = useCallback(callbackFactory(onChangeAlgorithm), []);
    const changeAutoObsolete = useCallback(callbackFactory(onChangeAutoObsolete), [])
    const changeTimeInDone = useCallback(callbackFactory(onChangeTimeInDone), [])
    const changeTimeInProgress = useCallback(callbackFactory(onChangeTimeInProgress), [])

    return <SettingsComponent
        settings={state}
        onChangeAlgorithm={changeAlgorithm}
        onChangeAutoObsolete={changeAutoObsolete}
        onChangeTimeInDone={changeTimeInDone}
        onChangeTimeInProgress={changeTimeInProgress}
    />
};