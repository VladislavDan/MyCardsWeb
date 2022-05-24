import * as React from 'react';
import {FC} from 'react';
import {FormGroup} from '@mui/material';

import {ISettingsComponent} from "./types/ISettingsComponent";
import {SettingsSwitcherComponent} from "./elements/settings-switcher/SettingsSwitcherComponent";
import {SettingsNumberInputComponent} from "./elements/settings-number-input/SettingsNumberInputComponent";
import './SettingsComponent.css'

export const SettingsComponent: FC<ISettingsComponent> = (
    {
        settings,
        onChangeAlgorithm,
        onChangeAutoObsolete,
        onChangeTimeInDone,
        onChangeTimeInProgress
    }
) => {

    return <FormGroup className="settings-form">
        <SettingsSwitcherComponent
            checked={settings.isRandomRepeating}
            label="Random repeating algorithm"
            onChange={onChangeAlgorithm}
        />
        <SettingsSwitcherComponent
            checked={settings.autoObsolete?.isEnable}
            label="Enable auto obsolete"
            onChange={onChangeAutoObsolete}
        />
        <SettingsNumberInputComponent
            value={settings.autoObsolete?.timeInDone}
            onChange={onChangeTimeInDone}
            label="How long cards exist in done status (days)"
        />
        <SettingsNumberInputComponent
            value={settings.autoObsolete?.timeInProgress}
            onChange={onChangeTimeInProgress}
            label="How long cards exist in progress status (days)"
        />
    </FormGroup>
};
