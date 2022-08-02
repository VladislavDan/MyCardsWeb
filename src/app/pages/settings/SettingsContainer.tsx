import * as React from 'react';
import {FC} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {SettingsComponent} from './SettingsComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {ISettings} from '../../common/types/ISettings';
import {ISettingsContainer} from "./types/ISettingsContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {INavigationState} from "../../common/types/INavigationState";
import {IAppContext} from "../../common/types/IAppContext";
import {AppContext} from "../../../App";
import {defaultSettings} from "../../common/defaults/defaultSettings";
import {onChangeSettingsChannel} from "./channels-callbacks/onChangeSettingsChannel";
import {onSettingsChannel} from "./channels-callbacks/onSettingsChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onChangeAlgorithm} from "./ui-callbacks/onChangeAlgorithm";
import {onChangeAutoObsolete} from "./ui-callbacks/onChangeAutoObsolete";
import {onChangeTimeInDone} from "./ui-callbacks/onChangeTimeInDone";
import {onChangeTimeInProgress} from "./ui-callbacks/onChangeTimeInProgress";

export const SettingsContainer: FC<ISettingsContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<INavigationState, ISettings, ISettingsContainer, IAppContext>(
        defaultSettings,
        services,
        AppContext
    );

    const {state, services: {settingsService}} = callbackSettings

    useChannel(settingsService.changeSettingsChannel, callbackFactory(onChangeSettingsChannel));
    useChannel(settingsService.settingsChannel, callbackFactory(onSettingsChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeAlgorithm = callbackFactory(onChangeAlgorithm);
    const changeAutoObsolete = callbackFactory(onChangeAutoObsolete)
    const changeTimeInDone = callbackFactory(onChangeTimeInDone)
    const changeTimeInProgress = callbackFactory(onChangeTimeInProgress)

    return <SettingsComponent
        settings={state}
        onChangeAlgorithm={changeAlgorithm}
        onChangeAutoObsolete={changeAutoObsolete}
        onChangeTimeInDone={changeTimeInDone}
        onChangeTimeInProgress={changeTimeInProgress}
    />
};