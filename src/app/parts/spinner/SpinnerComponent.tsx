import {LinearProgress} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';
import {ISpinnerComponent} from "./types/ISpinnerComponent";

export const SpinnerComponent: FC<ISpinnerComponent> = ({isShow}) => {
    return (
        isShow ? <LinearProgress color="secondary" /> : null
    )
};
