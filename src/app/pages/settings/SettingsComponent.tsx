import * as React from 'react';
import {ChangeEvent, FC} from 'react';
import './SettingsComponent.css'
import {ISettings} from '../../common/types/ISettings';
import {FormControlLabel, FormGroup, Switch} from '@mui/material';

export const SettingsComponent: FC<ISettingsComponent> = ({settings, onChange}) => {

    const onChangeAlgorithm = (event: ChangeEvent<HTMLInputElement>) => {
         onChange({...settings, isRandomRepeating: event.target.checked})
    };

    return <FormGroup className="settings-form">
        <FormControlLabel
            control={
                <Switch
                    checked={settings.isRandomRepeating}
                    onChange={onChangeAlgorithm}
                />
            }
            label="Random repeating algorithm"
        />
    </FormGroup>
};

interface ISettingsComponent {
    settings: ISettings
    onChange: (settings: ISettings) => void
}
