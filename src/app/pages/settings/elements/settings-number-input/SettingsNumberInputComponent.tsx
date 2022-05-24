import * as React from "react";
import {ChangeEvent, FC} from "react";

import {ISettingsNumberInputComponent} from "./types/ISettingsNumberInputComponent";
import {FormControlLabel, Input} from "@mui/material";

export const SettingsNumberInputComponent: FC<ISettingsNumberInputComponent> = (
    {
        value,
        label,
        onChange,
    }
) => {

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value))
    };

    return <FormControlLabel
        control={
            <Input
                type="number"
                value={value}
                onChange={change}
            />
        }
        label={label}
    />
}