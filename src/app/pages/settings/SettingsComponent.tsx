import * as React from 'react';
import {ChangeEvent, FC} from 'react';
import {FormControlLabel, FormGroup, FormLabel} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import {ISettingsComponent} from './types/ISettingsComponent';
import {SettingsSwitcherComponent} from './elements/settings-switcher/SettingsSwitcherComponent';
import {SettingsNumberInputComponent} from './elements/settings-number-input/SettingsNumberInputComponent';
import './SettingsComponent.css'
import {IRepeatingType} from '../../common/types/IRepeatingType';

export const SettingsComponent: FC<ISettingsComponent> = (
    {
        settings,
        onChangeAlgorithm,
        onChangeAutoObsolete,
        onChangeTimeInDone,
        onChangeTimeInProgress
    }
) => {

    const changeAlgorithm = (event: ChangeEvent<HTMLInputElement>) => {
        let repeatingType = Number(event.target.value) as any
        onChangeAlgorithm(repeatingType);
    };

    return <FormGroup className="settings-form">
        <FormLabel>Random repeating algorithm</FormLabel>
        <RadioGroup value={settings.repeatingType} onChange={changeAlgorithm}>
            <FormControlLabel value={IRepeatingType.DEFAULT} control={<Radio/>} label="Default"/>
            <FormControlLabel value={IRepeatingType.RANDOM} control={<Radio/>} label="Random"/>
        </RadioGroup>
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
        <SettingsNumberInputComponent
            value={settings.difficultCardsAmountForRepeating}
            onChange={onChangeTimeInProgress}
            label="How many difficult cards do you want to repeat by default"
        />
    </FormGroup>
};
