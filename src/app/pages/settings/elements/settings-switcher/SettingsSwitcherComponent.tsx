import * as React from "react";
import {ChangeEvent, FC} from "react";
import {FormControlLabel, Switch} from "@mui/material";
import {ISettingsSwitcherComponent} from "./types/ISettingsSwitcherComponent";

export const SettingsSwitcherComponent: FC<ISettingsSwitcherComponent> = (
    {
        checked,
        label,
        onChange
    }
) => {

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked)
    };

    return <FormControlLabel
        control={
            <Switch
                checked={checked}
                onChange={change}
            />
        }
        label={label}
    />
}