import {LinearProgress} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';

export const SpinnerComponent: FC<ISpinnerComponent> = ({isShow}) => {
    return (
        isShow ? <LinearProgress color="secondary" /> : null
    )
};

interface ISpinnerComponent {
   isShow: boolean;
}
